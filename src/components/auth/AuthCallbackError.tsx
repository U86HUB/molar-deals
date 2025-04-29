
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AuthCallbackErrorProps {
  error: string;
  onRetry: () => void;
  onGoToLogin: () => void;
}

const AuthCallbackError = ({ error, onRetry, onGoToLogin }: AuthCallbackErrorProps) => {
  return (
    <div className="w-full max-w-md">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Failed</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
      <div className="flex flex-col space-y-2">
        <Button onClick={onRetry} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" onClick={onGoToLogin} className="w-full">
          Return to Login
        </Button>
      </div>
    </div>
  );
};

export default AuthCallbackError;
