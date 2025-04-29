
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
      // Check network connectivity
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.");
      }

      console.log("Sending OTP to:", email);
      const origin = window.location.origin;
      console.log("Current origin:", origin);

      const { error, data } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // Create a new user if they don't exist
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("OTP Error details:", error);
        throw error;
      }
      
      console.log("OTP sent successfully:", data);
      toast.success("OTP sent to your email! Please check your inbox. The link will expire in 15 minutes.");
    } catch (error: any) {
      console.error("Full OTP error:", error);
      
      // Provide more helpful error messages based on error types
      let errorMessage = "Error sending OTP";
      
      if (error?.message?.includes("Failed to fetch")) {
        errorMessage = "Network error: Failed to reach authentication server. Please check your connection and try again.";
      } else if (error?.message?.includes("rate limit")) {
        errorMessage = "Too many attempts. Please wait a few minutes before trying again.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.signInWithOtp');
      }
      throw error;
    }
  };

  return { signIn, signUp, signInWithOtp };
};
