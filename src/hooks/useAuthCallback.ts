
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, clearBrowserCache, diagnoseBrowserNetwork } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Enhanced retry logic with exponential backoff
const useExponentialBackoff = () => {
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 3;
  
  // Calculate delay with exponential backoff
  const getBackoffDelay = (retry: number) => Math.min(1000 * Math.pow(2, retry), 8000);
  
  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    return retryCount < maxRetries;
  }, [retryCount, maxRetries]);
  
  const reset = useCallback(() => {
    setRetryCount(0);
  }, []);
  
  return {
    retryCount,
    maxRetries,
    canRetry: retryCount < maxRetries,
    retry,
    reset,
    delay: getBackoffDelay(retryCount)
  };
};

export const useAuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { 
    retryCount, 
    maxRetries, 
    canRetry, 
    retry, 
    reset: resetRetry,
    delay 
  } = useExponentialBackoff();

  // Extract and parse hash parameters from URL for more detailed error reporting
  const parseHashParams = useCallback(() => {
    try {
      const hash = window.location.hash.substring(1);
      if (!hash) return null;
      
      return hash.split('&').reduce((result: Record<string, string>, item) => {
        const parts = item.split('=');
        if (parts.length === 2) {
          result[parts[0]] = decodeURIComponent(parts[1]);
        }
        return result;
      }, {});
    } catch (e) {
      console.error("Error parsing hash params:", e);
      return null;
    }
  }, []);

  const handleAuthCallback = useCallback(async (isRetry = false) => {
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
      console.error(`Auth callback error (${isRetry ? 'retry' : 'initial'}):`, error);
      
      let errorMessage = error?.message || "Authentication failed. Please try again.";
      
      // Check for network-related errors that might benefit from retry
      const isNetworkError = 
        errorMessage.toLowerCase().includes("network") ||
        errorMessage.toLowerCase().includes("fetch") ||
        errorMessage.toLowerCase().includes("timeout") ||
        errorMessage.toLowerCase().includes("cors") ||
        errorMessage.toLowerCase().includes("secure context");
      
      // Auto-retry for network errors
      if (isNetworkError && canRetry) {
        console.log(`Network-related error detected. Will retry in ${delay}ms...`);
        toast.info(`Connection issue detected. Retrying (${retryCount + 1}/${maxRetries})...`);
        
        // Wait and retry with exponential backoff
        setTimeout(() => {
          if (retry()) {
            handleAuthCallback(true);
          } else {
            setError("Multiple connection attempts failed. Please check your internet connection and try again.");
            setIsLoading(false);
          }
        }, delay);
        return;
      }
      
      // Format error message for better user experience
      if (errorMessage.toLowerCase().includes("expire")) {
        errorMessage = "Your login link has expired. The link is only valid for 15 minutes. Please request a new one.";
      } else if (errorMessage.toLowerCase().includes("already used")) {
        errorMessage = "This login link has already been used. Please request a new one.";
      } else if (errorMessage.toLowerCase().includes("invalid")) {
        errorMessage = "The login link appears to be invalid. Please request a new one.";
      } else if (errorMessage.toLowerCase().includes("cors")) {
        errorMessage = "A security error occurred. This could be due to incorrect configuration. Please contact support or try again later.";
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  }, [navigate, retryCount, maxRetries, canRetry, retry, resetRetry, delay, parseHashParams]);

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
