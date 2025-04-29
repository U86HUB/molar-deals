
import { Loader2 } from "lucide-react";
import { useAuthCallback } from "@/hooks/useAuthCallback";
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
        <>
          <Loader2 className="animate-spin h-8 w-8 text-primary mb-4" />
          <p className="text-muted-foreground">Redirecting...</p>
        </>
      )}
    </div>
  );
};

export default AuthCallback;
