
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 3;

  const handleAuthCallback = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check network connectivity
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.");
      }
      
      console.log("Handling auth callback");
      
      // Stores the session in the browser
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        setError(error.message);
        
        // Auto-retry logic for specific errors that might be temporary
        if ((error.message.includes("Failed to fetch") || 
             error.message.includes("network") ||
             error.message.includes("timeout") ||
             error.message.includes("expired")) && 
            retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          toast.info(`Retrying authentication (${retryCount + 1}/${maxRetries})...`);
          // Wait a moment before retrying
          setTimeout(() => handleAuthCallback(), 2000);
          return;
        }
        
        setIsLoading(false);
        return;
      }

      if (data.session) {
        // Check if the user has set a password
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
        // No session found
        setError("No session found. Your login link may have expired. Please try signing in again.");
        navigate("/auth");
      }
    } catch (error: any) {
      console.error("Auth callback error:", error);
      
      let errorMessage = error?.message || "Authentication failed. Please try again.";
      
      // Check for expired session
      if (errorMessage.toLowerCase().includes("expire")) {
        errorMessage = "Your login link has expired. The link is only valid for 15 minutes. Please request a new one.";
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAuthCallback();
  }, [navigate]);

  const handleRetry = () => {
    setRetryCount(0);
    handleAuthCallback();
  };

  const handleGoToLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-8 w-8 text-primary mb-4" />
          <p className="text-muted-foreground">Completing authentication...</p>
          {retryCount > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Retry attempt {retryCount}/{maxRetries}
            </p>
          )}
        </>
      ) : error ? (
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Failed</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <div className="flex flex-col space-y-2">
            <Button onClick={handleRetry} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={handleGoToLogin} className="w-full">
              Return to Login
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Loader2 className="animate-spin h-8 w-8 text-primary mb-4" />
          <p className="text-muted-foreground">Redirecting...</p>
        </>
      )}
    </div>
  );
};

export default AuthCallback;
