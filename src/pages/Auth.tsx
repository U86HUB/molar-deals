
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import EmailSent from "@/components/auth/EmailSent";
import SupabaseConfigInfo from "@/components/auth/SupabaseConfigInfo";
import { checkSupabaseConnection, supabase, isSupabaseAuthConfigured, diagnoseBrowserNetwork, clearBrowserCache } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getSupabaseConfig } from "@/config/environment";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const { isLoading, isAuthenticated, hasSetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{success?: boolean; auth?: boolean; db?: boolean; error?: any} | null>(null);
  const [signUpsEnabled, setSignUpsEnabled] = useState<boolean | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  // Check if Supabase auth is configured
  const isAuthConfigured = isSupabaseAuthConfigured();

  // Check the connection status and sign-up settings on mount
  useEffect(() => {
    const checkConnection = async () => {
      setIsCheckingConnection(true);
      try {
        // Clear browser cache first to ensure fresh connection
        await clearBrowserCache();
        
        // Log network diagnostics
        const networkInfo = diagnoseBrowserNetwork();
        
        const status = await checkSupabaseConnection();
        setConnectionStatus(status);
        
        if (!status.success) {
          if (!isAuthConfigured) {
            setError("Supabase authentication configuration is missing or invalid. Please check your environment variables.");
          } else {
            setError("Connection to Supabase failed. This could be due to network issues, or because database migrations haven't been applied.");
          }
          setShowConfig(true);
        } else if (!status.db) {
          setError("Authentication connected successfully, but there was an issue accessing the database: " + 
                  (status.error?.message || "Unknown database error"));
          setShowConfig(true);
        } else {
          // Connection is successful, so let's show a success message
          toast.success("Supabase connection successful! Authentication should now work properly.");
        }
        
        // Check if sign-ups are enabled
        try {
          // Just a test to see if we can create users
          const { data, error } = await supabase.auth.signUp({
            email: "test_signup_check@example.com",
            password: "password123",
          });
          
          // If we get here without an error about disabled sign-ups, then sign-ups are enabled
          setSignUpsEnabled(true);
          
          // Immediately abort the sign-up attempt if successful
          if (data?.user?.id) {
            await supabase.auth.admin.deleteUser(data.user.id);
          }
        } catch (err: any) {
          console.error("Sign-up check error:", err);
          
          // Check if the error message indicates sign-ups are disabled
          const errorMsg = err.message?.toLowerCase() || "";
          if (errorMsg.includes("sign-up") || 
              errorMsg.includes("sign up") ||
              errorMsg.includes("disabled") ||
              errorMsg.includes("database error finding user")) {
            
            setSignUpsEnabled(false);
            setError("Sign-ups appear to be disabled in Supabase. Please enable them in the Supabase Dashboard.");
            setShowConfig(true);
          }
        }
        
        // Log Supabase config for debugging
        const config = getSupabaseConfig();
        console.log("Supabase client config:", {
          url: config.url,
          keyAvailable: !!config.anonKey,
        });
      } catch (error) {
        console.error("Error checking connection:", error);
        setError("Error checking connection to Supabase.");
      } finally {
        setIsCheckingConnection(false);
      }
    };
    
    checkConnection();
  }, []);

  // Check if the user needs to set a password
  useEffect(() => {
    if (isAuthenticated && !hasSetPassword) {
      navigate("/settings?tab=account&setup=password");
    } else if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, hasSetPassword, navigate, from]);

  // Show config info if there's an error parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      setShowConfig(true);
    }
  }, [location]);

  const handleEmailSuccess = (email: string) => {
    setOtpSent(true);
    setEmail(email);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
    checkConnection();
  };

  const handleBackToForm = () => {
    setOtpSent(false);
    setEmail("");
  };

  const checkConnection = async () => {
    setIsCheckingConnection(true);
    try {
      await clearBrowserCache();
      const status = await checkSupabaseConnection();
      setConnectionStatus(status);
      
      if (status.success && status.db) {
        setError(null);
        toast.success("Connection to Supabase successful!");
      } else {
        let msg = "Connection issues persist. ";
        if (!status.auth) {
          msg += "Authentication API could not be reached. ";
        }
        if (!status.db) {
          msg += status.error?.message || "Database could not be accessed.";
        }
        setError(msg);
      }
    } catch (error: any) {
      setError(`Failed to check connection: ${error.message}`);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  // Toggle showing config info
  const toggleConfig = () => {
    setShowConfig(prev => !prev);
  };
  
  // Check if there's an obvious configuration issue
  const hasConfigIssue = 
    !isAuthConfigured || 
    (connectionStatus && 
    (!connectionStatus.success || !connectionStatus.auth || !connectionStatus.db));

  // Check if the error message contains sign-ups disabled
  const hasSignUpDisabledError = 
    signUpsEnabled === false || 
    (error && (error.includes("sign-up") || error.includes("sign up") || error.includes("Database error finding user")));

  if (isLoading || isCheckingConnection) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary mb-4" />
        <p className="text-center text-muted-foreground">
          {isCheckingConnection ? "Checking connection to Supabase..." : "Loading authentication state..."}
        </p>
      </div>
    );
  }

  return (
    <AuthLayout>
      {otpSent ? (
        <EmailSent email={email} onBack={handleBackToForm} />
      ) : (
        <>
          {!isAuthConfigured && (
            <div className="p-4 mb-4 border border-red-500 bg-red-50 rounded-md">
              <h3 className="font-medium text-red-800">
                Supabase Configuration Missing
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Supabase URL or Anonymous Key may be missing or invalid. 
                Please check your environment variables.
              </p>
              <button 
                className="text-sm text-red-800 underline mt-1" 
                onClick={toggleConfig}
              >
                View troubleshooting guide
              </button>
            </div>
          )}

          {hasConfigIssue && connectionStatus && (
            <div className="p-4 mb-4 border border-yellow-500 bg-yellow-50 rounded-md">
              <h3 className="font-medium text-yellow-800">
                Supabase Connection Issue Detected
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                {!connectionStatus.auth 
                  ? "Authentication API key may be missing or invalid." 
                  : !connectionStatus.db 
                    ? "Database access error: " + (connectionStatus.error?.message || "Unknown database error") 
                    : "Connection to Supabase failed."}
              </p>
              <div className="flex space-x-2 mt-2">
                <button 
                  className="text-sm text-yellow-800 underline" 
                  onClick={toggleConfig}
                >
                  View troubleshooting guide
                </button>
                <button 
                  className="text-sm text-yellow-800 underline" 
                  onClick={checkConnection}
                >
                  Check again
                </button>
              </div>
            </div>
          )}

          {hasSignUpDisabledError && (
            <div className="p-4 mb-4 border border-red-500 bg-red-50 rounded-md">
              <h3 className="font-medium text-red-800">
                Sign-ups Disabled in Supabase
              </h3>
              <p className="text-sm text-red-700 mt-1">
                You need to enable sign-ups in the Supabase Dashboard:
                <br />
                <strong>Auth → Settings → General → Enable sign-ups</strong>
              </p>
              <button 
                className="text-sm text-red-800 underline mt-1" 
                onClick={toggleConfig}
              >
                View detailed instructions
              </button>
            </div>
          )}

          {connectionStatus && connectionStatus.success && connectionStatus.db && !hasSignUpDisabledError && (
            <div className="p-4 mb-4 border border-green-500 bg-green-50 rounded-md">
              <h3 className="font-medium text-green-800">
                Connection to Supabase Successful
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Database migrations have been applied successfully. You can now use authentication.
              </p>
            </div>
          )}
          
          <AuthForm 
            onSuccess={handleEmailSuccess} 
            onRetry={handleRetry}
            error={error}
          />
          
          {showConfig && <SupabaseConfigInfo />}
          
          <div className="mt-4 text-center">
            <button
              onClick={toggleConfig}
              className="text-sm text-muted-foreground underline hover:text-primary"
            >
              {showConfig ? "Hide configuration help" : "Having trouble? View configuration help"}
            </button>
          </div>
          
          <div className="mt-8 pt-4 border-t text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Need to run migrations or check Supabase settings?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://supabase.com/dashboard/project/fyyfrlhcvtxddonnkeoy/auth/providers", "_blank")}
              >
                Auth Providers
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://supabase.com/dashboard/project/fyyfrlhcvtxddonnkeoy/auth/users", "_blank")}
              >
                User Management
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://supabase.com/dashboard/project/fyyfrlhcvtxddonnkeoy/sql/new", "_blank")}
              >
                SQL Editor
              </Button>
            </div>
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default Auth;
