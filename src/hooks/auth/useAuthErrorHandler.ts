
import { useCallback } from "react";
import { toast } from "sonner";

interface UseAuthErrorHandlerProps {
  canRetry: boolean;
  retry: () => boolean;
  handleAuthCallback: (isRetry: boolean) => Promise<void>;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  delay: number;
}

export const useAuthErrorHandler = ({
  canRetry,
  retry,
  handleAuthCallback,
  setError,
  setIsLoading,
  delay
}: UseAuthErrorHandlerProps) => {

  const handleError = useCallback((error: any, isRetry: boolean): boolean => {
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
      toast.info(`Connection issue detected. Retrying (${retry()}/${canRetry})...`);
      
      // Wait and retry with exponential backoff
      setTimeout(() => {
        if (retry()) {
          handleAuthCallback(true);
        } else {
          setError("Multiple connection attempts failed. Please check your internet connection and try again.");
          setIsLoading(false);
        }
      }, delay);
      return true;
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
    
    return false;
  }, [canRetry, delay, handleAuthCallback, retry, setError, setIsLoading]);

  return { handleError };
};
