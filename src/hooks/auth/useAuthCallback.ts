
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, clearBrowserCache, diagnoseBrowserNetwork } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useExponentialBackoff } from "./useExponentialBackoff";
import { useHashParams } from "./useHashParams";
import { useAuthErrorHandler } from "./useAuthErrorHandler";

export const useAuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { parseHashParams } = useHashParams();
  
  const { 
    retryCount, 
    maxRetries, 
    canRetry, 
    retry, 
    reset: resetRetry,
    delay 
  } = useExponentialBackoff();

  const handleAuthCallback = useCallback(async (isRetry = false): Promise<void> => {
    try {
      if (isRetry) {
        console.log(`Retry attempt ${retryCount} of ${maxRetries}...`);
      } else {
        setIsLoading(true);
        setError(null);
        resetRetry();
      }
      
      // Check network connectivity with enhanced diagnostics
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.");
      }
      
      // Diagnose browser network capabilities
      const networkDiagnostics = diagnoseBrowserNetwork();
      console.log(`Auth callback network diagnostics (${isRetry ? 'retry' : 'initial'}):`, networkDiagnostics);
      
      // Clear any cached data that might cause issues
      await clearBrowserCache();
      
      console.log(`Handling auth callback (${isRetry ? 'retry' : 'initial'})`);
      
      // Check for error parameters in URL hash
      const hashParams = parseHashParams();
      if (hashParams && hashParams.error) {
        console.error("Error from hash params:", hashParams);
        throw new Error(`Authentication error: ${hashParams.error_description || hashParams.error}`);
      }
      
      // Stores the session in the browser with enhanced error handling
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error(`Auth callback error (${isRetry ? 'retry' : 'initial'}):`, error);
        
        // Check for specific error types for better user feedback
        if (error.message.includes("expired")) {
          throw new Error("Your login link has expired. Magic links are valid for 15 minutes only. Please request a new one.");
        }
        
        throw error;
      }

      if (data.session) {
        // Success! Check if the user has set a password
        const userMeta = data.session.user.user_metadata;
        const hasSetPassword = Boolean(userMeta?.has_set_password);
        const hasCompletedOnboarding = Boolean(userMeta?.onboarding_completed);

        if (!hasSetPassword) {
          // Redirect to password setup
          navigate("/settings?tab=account&setup=password");
          toast.info("Welcome! Please set up your account password.");
        } else if (!hasCompletedOnboarding) {
          // Redirect to homepage which will show onboarding wizard
          navigate("/");
          toast.info("Welcome! Let's set up your profile.");
        } else {
          // Redirect to dashboard for fully set up users
          navigate("/dashboard");
          toast.success("Successfully signed in!");
        }
      } else {
        // No session found - could be several reasons
        throw new Error("No session found. Your login link may have expired or been used already. Please try signing in again.");
      }
    } catch (error: any) {
      // Error handling is now delegated to the useAuthErrorHandler hook
      errorHandler.handleError(error, isRetry);
      return;
    }
  }, [navigate, retryCount, maxRetries, resetRetry, parseHashParams]);

  // Create the error handler with the necessary dependencies
  const errorHandler = useAuthErrorHandler({
    canRetry,
    retry,
    handleAuthCallback,
    setError,
    setIsLoading,
    delay
  });

  const handleRetry = useCallback(() => {
    resetRetry();
    handleAuthCallback();
  }, [resetRetry, handleAuthCallback]);

  const handleGoToLogin = useCallback(() => {
    navigate("/auth");
  }, [navigate]);

  useEffect(() => {
    // Wait a short moment before starting the auth process
    // This can help with browser rendering and network initialization
    const initDelay = setTimeout(() => {
      handleAuthCallback();
    }, 300);
    
    return () => clearTimeout(initDelay);
  }, [handleAuthCallback]);

  return {
    isLoading,
    error,
    retryCount,
    maxRetries,
    handleRetry,
    handleGoToLogin
  };
};
