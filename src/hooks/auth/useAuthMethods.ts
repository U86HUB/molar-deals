
import { toast } from "sonner";
import { supabase, diagnoseBrowserNetwork, clearBrowserCache } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";
import { validatePassword } from "@/utils/passwordUtils";

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
      // Validate password before sending to Supabase
      const isPasswordValid = await validatePassword(password);
      
      if (!isPasswordValid) {
        // The validatePassword function already shows toast messages
        return;
      }
      
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
      // Enhanced network diagnostics
      const networkDiagnostics = diagnoseBrowserNetwork();
      console.log("Network diagnostics before OTP request:", networkDiagnostics);
      
      // Enhanced network connectivity check
      if (!navigator.onLine) {
        const networkError = new Error("You appear to be offline. Please check your internet connection and try again.");
        console.error("Network offline:", networkError);
        throw networkError;
      }

      console.log("Sending OTP to:", email);
      // Get current origin but handle potential issues
      let origin = window.location.origin;
      console.log("Current origin:", origin);
      
      // Check if we're in localhost and apply a fallback if needed
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        console.log("Local development detected. Make sure you've configured Supabase for localhost.");
      }
      
      // Try to clear any cached auth data that might be causing issues
      await clearBrowserCache();
      
      // Add timeout to the request to prevent long-hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      try {
        // More detailed OTP request logging
        console.log("Starting OTP request with:", {
          email,
          redirectTo: `${origin}/auth/callback`,
          timestamp: new Date().toISOString(),
        });
        
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
          
          // Enhanced error handling for specific errors
          if (error.message?.includes("Invalid login credentials")) {
            throw new Error("We couldn't find an account with this email. Please check the email or sign up.");
          } else if (error.message?.includes("Database error finding user")) {
            // This suggests a Supabase configuration issue
            const setupError = new Error(
              "There seems to be an issue with the authentication setup. " +
              "Please check if your Supabase project is properly configured and the database is accessible. " +
              "This could be due to a database migration issue or permissions problem."
            );
            console.error("Supabase auth setup issue:", setupError);
            throw setupError;
          }
          
          throw error;
        }
        
        console.log("OTP sent successfully:", data);
        toast.success("OTP sent to your email! Please check your inbox. The link will expire in 15 minutes.");
      } catch (error: any) {
        clearTimeout(timeoutId);
        
        console.error("Full OTP error:", error);
        
        // Enhanced error handling with even more specific messages
        let errorMessage = "Error sending OTP";
        
        if (error.name === "AbortError") {
          errorMessage = "Request timed out. The server took too long to respond. Please check your connection and try again.";
        } else if (error.message?.includes("Failed to fetch")) {
          errorMessage = "Network error: Unable to reach the authentication server. Please check:";
          errorMessage += "\n- Your internet connection";
          errorMessage += "\n- Any browser extensions that might be blocking the connection";
          errorMessage += "\n- Your firewall settings";
          
          // Log detailed diagnostics
          console.error("Network diagnostic info:", {
            origin,
            online: navigator.onLine,
            connection: (navigator as any).connection ? (navigator as any).connection.effectiveType : "unknown",
            https: window.location.protocol === 'https:',
            timestamp: new Date().toISOString(),
          });
          
          // Try to diagnose CORS issues
          errorMessage += "\n\nThis might be a CORS issue. Please check if the site URL in Supabase is correctly configured.";
        } else if (error.message?.includes("rate limit")) {
          errorMessage = "Too many attempts. Please wait a few minutes before trying again.";
        } else if (error.message?.includes("Database error finding user")) {
          errorMessage = "There seems to be an issue with the authentication setup in Supabase. " +
                         "Please contact the administrator to verify the database configuration.";
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
