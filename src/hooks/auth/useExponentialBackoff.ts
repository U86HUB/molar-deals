
import { useState, useCallback } from "react";

export const useExponentialBackoff = () => {
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
