
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Session, User, Provider } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { trackError } from "@/services/errorService";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    role?: string;
  }) => Promise<void>;
  signInWithOtp: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  updateUserProfile: (data: { username?: string; full_name?: string; role?: string }) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  hasSetPassword: boolean;
  checkHasSetPassword: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signInWithOtp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  isAuthenticated: false,
  updateUserProfile: async () => {},
  updateUserPassword: async () => {},
  hasSetPassword: false,
  checkHasSetPassword: async () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSetPassword, setHasSetPassword] = useState(false);

  useEffect(() => {
    try {
      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const hasPassword = await checkHasSetPassword();
            setHasSetPassword(hasPassword);
          }
          
          setIsLoading(false);
        }
      );

      // Then check for existing session
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const hasPassword = await checkHasSetPassword();
          setHasSetPassword(hasPassword);
        }
        
        setIsLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.useEffect');
      }
      setIsLoading(false);
    }
  }, []);

  const checkHasSetPassword = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // We use a custom user metadata field to track if password has been set
      return !!user.user_metadata?.has_set_password;
    } catch (error) {
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.checkHasSetPassword');
      }
      return false;
    }
  };

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
          // Note: emailOtpExpiresIn is not supported in the current Supabase client version
          // Default OTP expiry is 60 minutes in Supabase
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

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully signed out!");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.signOut');
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      toast.success("Password reset link sent to your email!");
    } catch (error: any) {
      toast.error(error.message || "Error resetting password");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.resetPassword');
      }
      throw error;
    }
  };

  const updateUserProfile = async (data: { username?: string; full_name?: string; role?: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data
      });

      if (error) throw error;
      
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error updating profile");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.updateUserProfile');
      }
      throw error;
    }
  };

  // New method to update user password
  const updateUserPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
        data: {
          has_set_password: true
        }
      });

      if (error) throw error;
      
      setHasSetPassword(true);
      toast.success("Password set successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error setting password");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.updateUserPassword');
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signIn,
        signUp,
        signInWithOtp,
        signOut,
        resetPassword,
        isAuthenticated: !!user,
        updateUserProfile,
        updateUserPassword,
        hasSetPassword,
        checkHasSetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
