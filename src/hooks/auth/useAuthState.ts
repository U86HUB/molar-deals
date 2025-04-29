
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSetPassword, setHasSetPassword] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

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
            
            const onboardingCompleted = !!session.user.user_metadata?.onboarding_completed;
            setHasCompletedOnboarding(onboardingCompleted);
          } else {
            setHasCompletedOnboarding(null);
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
          
          const onboardingCompleted = !!session.user.user_metadata?.onboarding_completed;
          setHasCompletedOnboarding(onboardingCompleted);
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

  const checkHasCompletedOnboarding = (): boolean => {
    if (!user) return false;
    return !!user.user_metadata?.onboarding_completed;
  };

  return {
    session,
    user,
    isLoading,
    hasSetPassword,
    hasCompletedOnboarding,
    checkHasSetPassword,
    checkHasCompletedOnboarding,
    isAuthenticated: !!user
  };
};
