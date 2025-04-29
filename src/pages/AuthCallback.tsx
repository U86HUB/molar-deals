
import { useAuthCallback } from "@/hooks/auth/useAuthCallback";
import AuthCallbackLoader from "@/components/auth/AuthCallbackLoader";
import AuthCallbackError from "@/components/auth/AuthCallbackError";

const AuthCallback = () => {
  const {
    isLoading,
    error,
    retryCount,
    maxRetries,
    handleRetry,
    handleGoToLogin
  } = useAuthCallback();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      {isLoading ? (
        <AuthCallbackLoader retryCount={retryCount} maxRetries={maxRetries} />
      ) : error ? (
        <AuthCallbackError 
          error={error} 
          onRetry={handleRetry} 
          onGoToLogin={handleGoToLogin} 
        />
      ) : (
        <AuthCallbackLoader retryCount={retryCount} maxRetries={maxRetries} />
      )}
    </div>
  );
};

export default AuthCallback;
