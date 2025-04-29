
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
  signInWithProvider: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  updateUserProfile: (data: { username?: string; full_name?: string; role?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signInWithProvider: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  isAuthenticated: false,
  updateUserProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        }
      );

      // Then check for existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
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

  const signInWithProvider = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Error signing in with provider");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.signInWithProvider');
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
        data: data
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

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signIn,
        signUp,
        signInWithProvider,
        signOut,
        resetPassword,
        isAuthenticated: !!user,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
