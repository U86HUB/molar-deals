
import { Loader2 } from "lucide-react";

interface AuthCallbackLoaderProps {
  retryCount: number;
  maxRetries: number;
}

const AuthCallbackLoader = ({ retryCount, maxRetries }: AuthCallbackLoaderProps) => {
  return (
    <>
      <Loader2 className="animate-spin h-8 w-8 text-primary mb-4" />
      <p className="text-muted-foreground">Completing authentication...</p>
      {retryCount > 0 && (
        <p className="text-sm text-muted-foreground mt-2">
          Retry attempt {retryCount}/{maxRetries}
        </p>
      )}
    </>
  );
};

export default AuthCallbackLoader;
