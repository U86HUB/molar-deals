
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { trackError } from "@/services/errorService";

export const useUserMetadata = (user: User | null) => {
  const [hasSetPassword, setHasSetPassword] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  // Update metadata states when user changes
  useEffect(() => {
    if (user) {
      // Check password status
      setHasSetPassword(!!user.user_metadata?.has_set_password);
      
      // Check onboarding status
      setHasCompletedOnboarding(!!user.user_metadata?.onboarding_completed);
    } else {
      setHasSetPassword(false);
      setHasCompletedOnboarding(null);
    }
  }, [user]);

  const checkHasSetPassword = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // We use a custom user metadata field to track if password has been set
      return !!user.user_metadata?.has_set_password;
    } catch (error) {
      if (error instanceof Error) {
        trackError(error, 'useUserMetadata.checkHasSetPassword');
      }
      return false;
    }
  };

  const checkHasCompletedOnboarding = (): boolean => {
    if (!user) return false;
    return !!user.user_metadata?.onboarding_completed;
  };

  return {
    hasSetPassword,
    hasCompletedOnboarding,
    checkHasSetPassword,
    checkHasCompletedOnboarding
  };
};
