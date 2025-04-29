
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { WifiOff, Wifi, AlertTriangle, CheckCircle, RefreshCw, Database } from "lucide-react";
import { checkSupabaseConnection, clearBrowserCache, diagnoseBrowserNetwork } from "@/integrations/supabase/client";

interface ConnectionStatusProps {
  onRetry?: () => void;
}

const ConnectionStatus = ({ onRetry }: ConnectionStatusProps) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    checked: boolean;
    success: boolean;
    auth: boolean;
    db: boolean;
    error?: any;
    errorMessage?: string;
  }>({
    checked: false,
    success: false,
    auth: false,
    db: false
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      // Check browser network capabilities
      const networkDiagnostics = diagnoseBrowserNetwork();
      console.log("Network diagnostics:", networkDiagnostics);
      
      // Try to clear cache before checking connection
      await clearBrowserCache();
      
      // Check Supabase connection
      const result = await checkSupabaseConnection();
      
      // Parse error message for specific issues
      let errorMessage = undefined;
      if (result.error) {
        const errorString = String(result.error);
        if (errorString.includes("raw_app_meta_data")) {
          errorMessage = "Database schema mismatch: Missing 'raw_app_meta_data' column. This may require a database migration.";
        } else if (errorString.includes("raw_user_meta_data")) {
          errorMessage = "Database schema mismatch: Missing 'raw_user_meta_data' column. This may require a database migration.";
        }
      }
      
      setConnectionStatus({
        checked: true,
        success: !!result.success,
        auth: !!result.auth,
        db: !!result.db,
        error: result.error,
        errorMessage
      });
    } catch (error) {
      console.error("Error checking connection:", error);
      setConnectionStatus({
        checked: true,
        success: false,
        auth: false,
        db: false,
        error
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  // If not checked yet, check connection
  useEffect(() => {
    if (!connectionStatus.checked && isOnline) {
      checkConnection();
    }
  }, [connectionStatus.checked, isOnline]);

  // If offline, show offline status
  if (!isOnline) {
    return (
      <Alert variant="destructive" className="mb-4">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>You're offline</AlertTitle>
        <AlertDescription>
          Please check your internet connection and try again.
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // If checking, show checking status
  if (isChecking) {
    return (
      <Alert className="mb-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
        <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
        <AlertTitle>Checking connection...</AlertTitle>
        <AlertDescription>
          We're checking your connection to our services.
        </AlertDescription>
      </Alert>
    );
  }

  // If connection failed due to database schema issues
  if (connectionStatus.checked && connectionStatus.errorMessage) {
    return (
      <Alert variant="destructive" className="mb-4">
        <Database className="h-4 w-4" />
        <AlertTitle>Database Schema Issue</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>{connectionStatus.errorMessage}</p>
          <p className="text-sm">
            This requires database migrations to be run using the Supabase CLI:
          </p>
          <div className="bg-gray-800 text-gray-200 p-2 rounded text-xs font-mono overflow-x-auto">
            <p>supabase link --project-ref fyyfrlhcvtxddonnkeoy</p>
            <p>supabase db push</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={checkConnection}
              className="mt-2"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Check Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // If connection failed, show error
  if (connectionStatus.checked && !connectionStatus.success) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Connection Issue Detected</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>We're having trouble connecting to our authentication service.</p>
          {connectionStatus.error && (
            <p className="text-xs text-red-400">
              {connectionStatus.error.message || String(connectionStatus.error)}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={checkConnection}
              className="mt-2"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Check Again
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleRetry}
            >
              Try Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // If connection succeeded but we're looking at this component, there must be other issues
  if (connectionStatus.checked && connectionStatus.success) {
    return (
      <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle>Connection OK</AlertTitle>
        <AlertDescription>
          Your connection to our services is working. If you're experiencing issues, it may be related to your account or session.
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full"
            onClick={handleRetry}
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null; // Default return if none of the conditions are met
};

export default ConnectionStatus;
