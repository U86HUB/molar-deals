
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";

export const useAuthState = () => {
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

  return {
    session,
    user,
    isLoading,
    hasSetPassword,
    checkHasSetPassword,
    isAuthenticated: !!user
  };
};
