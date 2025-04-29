
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import EmailSent from "@/components/auth/EmailSent";
import SupabaseConfigInfo from "@/components/auth/SupabaseConfigInfo";
import { checkSupabaseConnection, supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const { isLoading, isAuthenticated, hasSetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{success?: boolean; auth?: boolean; db?: boolean} | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  // Check the connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const status = await checkSupabaseConnection();
        setConnectionStatus(status);
        
        if (!status.success) {
          setError("Unable to connect to Supabase. Please check your configuration.");
          setShowConfig(true);
        } else if (!status.auth) {
          setError("Connected to Supabase but authentication is not working correctly. Check API keys.");
          setShowConfig(true);
        }
        
        // Log Supabase config for debugging
        console.log("Supabase client config:", {
          url: supabase.supabaseUrl,
          keyAvailable: !!supabase.supabaseKey,
        });
      } catch (error) {
        console.error("Error checking connection:", error);
        setError("Error checking connection to Supabase.");
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
  };

  const handleBackToForm = () => {
    setOtpSent(false);
    setEmail("");
  };

  // Toggle showing config info
  const toggleConfig = () => {
    setShowConfig(prev => !prev);
  };
  
  // Check if there's an obvious configuration issue
  const hasConfigIssue = 
    connectionStatus && 
    (!connectionStatus.success || !connectionStatus.auth || !connectionStatus.db);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <AuthLayout>
      {otpSent ? (
        <EmailSent email={email} onBack={handleBackToForm} />
      ) : (
        <>
          {hasConfigIssue && (
            <div className="p-4 mb-4 border border-yellow-500 bg-yellow-50 rounded-md">
              <h3 className="font-medium text-yellow-800">
                Supabase Configuration Issue Detected
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                {!connectionStatus?.auth 
                  ? "Authentication API key may be missing or invalid." 
                  : !connectionStatus?.db 
                    ? "Database connection not working." 
                    : "Connection to Supabase failed."}
              </p>
              <button 
                className="text-sm text-yellow-800 underline mt-1" 
                onClick={toggleConfig}
              >
                View troubleshooting guide
              </button>
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
        </>
      )}
    </AuthLayout>
  );
};

export default Auth;
