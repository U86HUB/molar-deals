
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";
import { toast } from "sonner";

export const useSessionState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Properly order the authentication initialization
      // 1. First set up the listener for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, newSession) => {
          console.log("Auth state change detected:", _event);
          // Set session first before setting user to ensure proper ordering
          setSession(newSession);
          setUser(newSession?.user ?? null);
          setIsLoading(false);
        }
      );
      
      // 2. Then check for an existing session
      supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
          console.error("Error retrieving session:", error);
          setInitError(error);
          toast.error("Failed to retrieve authentication session.");
          setIsLoading(false);
          return;
        }
        
        const currentSession = data.session;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
      }).catch(err => {
        console.error("Fatal error getting session:", err);
        setInitError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });

      return () => {
        // Clean up subscription when component unmounts
        subscription.unsubscribe();
      };
    } catch (error) {
      if (error instanceof Error) {
        trackError(error, 'useSessionState.useEffect');
        setInitError(error);
      }
      setIsLoading(false);
    }
  }, []);

  return {
    session,
    user,
    isLoading,
    initError,
    isAuthenticated: !!user && !!session
  };
};
