
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";

export const useAuthMethods = () => {
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success("Successfully signed in!");
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.signIn');
      }
      throw error;
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData?: {
      username?: string;
      full_name?: string;
      role?: string;
    }
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...userData,
            role: userData?.role || "customer", // Default role
            has_set_password: true, // Mark that the user has set a password during signup
          },
        },
      });

      if (error) throw error;
      
      toast.success("Registration successful! Please check your email to confirm your account.");
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.signUp');
      }
      throw error;
    }
  };

  const signInWithOtp = async (email: string) => {
    try {
      // Enhanced network connectivity check with more detailed error
      if (!navigator.onLine) {
        const networkError = new Error("You appear to be offline. Please check your internet connection and try again.");
        console.error("Network offline:", networkError);
        throw networkError;
      }

      console.log("Sending OTP to:", email);
      const origin = window.location.origin;
      console.log("Current origin:", origin);
      
      // Add timeout to the request to prevent long-hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const { error, data } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true, // Create a new user if they don't exist
            emailRedirectTo: `${origin}/auth/callback`,
          },
        });

        clearTimeout(timeoutId);
        
        if (error) {
          console.error("OTP Error details:", error);
          throw error;
        }
        
        console.log("OTP sent successfully:", data);
        toast.success("OTP sent to your email! Please check your inbox. The link will expire in 15 minutes.");
      } catch (error: any) {
        clearTimeout(timeoutId);
        
        console.error("Full OTP error:", error);
        
        // Enhanced error handling with more specific messages
        let errorMessage = "Error sending OTP";
        
        if (error.name === "AbortError") {
          errorMessage = "Request timed out. The server took too long to respond. Please check your connection and try again.";
        } else if (error.message?.includes("Failed to fetch")) {
          errorMessage = "Network error: Unable to reach the authentication server. This could be due to:";
          errorMessage += "\n- Network connectivity issues";
          errorMessage += "\n- Firewall or security software blocking the connection";
          errorMessage += "\n- Site URL not properly configured in Supabase";
          console.error("Network diagnostic info:", {
            origin,
            online: navigator.onLine,
            connection: (navigator as any).connection ? (navigator as any).connection.effectiveType : "unknown"
          });
        } else if (error.message?.includes("rate limit")) {
          errorMessage = "Too many attempts. Please wait a few minutes before trying again.";
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
        
        if (error instanceof Error) {
          trackError(error, 'AuthProvider.signInWithOtp');
        }
        throw error;
      }
    } catch (error: any) {
      // Final catch-all error handler
      console.error("Outer signInWithOtp error:", error);
      let errorMessage = error?.message || "Authentication failed. Please try again.";
      toast.error(errorMessage);
      
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.signInWithOtp');
      }
      throw error;
    }
  };

  return { signIn, signUp, signInWithOtp };
};
