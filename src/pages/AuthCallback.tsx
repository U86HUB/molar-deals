
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extract the auth code from the URL
        const hash = window.location.hash;
        
        console.log("Handling auth callback");

        // Stores the session in the browser
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          toast.error("Authentication failed. Please try again.");
          navigate("/auth");
          return;
        }

        if (data.session) {
          // Check if the user has set a password
          const userMeta = data.session.user.user_metadata;
          const hasSetPassword = Boolean(userMeta?.has_set_password);

          if (!hasSetPassword) {
            // Redirect to password setup
            navigate("/settings?tab=account&setup=password");
            toast.info("Welcome! Please set up your account password.");
          } else {
            // Redirect to dashboard
            navigate("/dashboard");
            toast.success("Successfully signed in!");
          }
        } else {
          // No session found
          navigate("/auth");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/auth");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Loader2 className="animate-spin h-8 w-8 text-primary mb-4" />
      <p className="text-muted-foreground">Completing authentication...</p>
    </div>
  );
};

export default AuthCallback;
