
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import EmailSent from "@/components/auth/EmailSent";

const Auth = () => {
  const { isLoading, isAuthenticated, hasSetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  // Check if the user needs to set a password
  useEffect(() => {
    if (isAuthenticated && !hasSetPassword) {
      navigate("/settings?tab=account&setup=password");
    } else if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, hasSetPassword, navigate, from]);

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
        <AuthForm 
          onSuccess={handleEmailSuccess} 
          onRetry={handleRetry}
          error={error}
        />
      )}
    </AuthLayout>
  );
};

export default Auth;
