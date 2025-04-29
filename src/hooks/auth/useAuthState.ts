
import { useSessionState } from "./useSessionState";
import { useUserMetadata } from "./useUserMetadata";

export const useAuthState = () => {
  const { session, user, isLoading, isAuthenticated } = useSessionState();
  const { 
    hasSetPassword, 
    hasCompletedOnboarding, 
    checkHasSetPassword,
    checkHasCompletedOnboarding 
  } = useUserMetadata(user);

  return {
    // Session state
    session,
    user,
    isLoading,
    isAuthenticated,
    
    // User metadata
    hasSetPassword,
    hasCompletedOnboarding,
    checkHasSetPassword,
    checkHasCompletedOnboarding,
  };
};
