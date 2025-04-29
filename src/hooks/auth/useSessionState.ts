
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";

export const useSessionState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Get the current session first
      supabase.auth.getSession().then(({ data }) => {
        const session = data.session;
        setSession(session);
        setUser(session?.user ?? null);
        
        // We'll handle metadata separately
        setIsLoading(false);
      });
      
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    } catch (error) {
      if (error instanceof Error) {
        trackError(error, 'useSessionState.useEffect');
      }
      setIsLoading(false);
    }
  }, []);

  return {
    session,
    user,
    isLoading,
    isAuthenticated: !!user && !!session
  };
};
