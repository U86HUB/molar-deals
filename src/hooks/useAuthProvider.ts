
import { useAuthState } from "./auth/useAuthState";
import { useAuthMethods } from "./auth/useAuthMethods";
import { useAuthProfile } from "./auth/useAuthProfile";

export const useAuthProvider = () => {
  const { 
    session, 
    user, 
    isLoading, 
    hasSetPassword,
    hasCompletedOnboarding,
    checkHasSetPassword,
    checkHasCompletedOnboarding,
    isAuthenticated 
  } = useAuthState();
  
  const { signIn, signUp, signInWithOtp } = useAuthMethods();
  const { updateUserProfile, updateUserPassword, resetPassword, signOut } = useAuthProfile();

  return {
    // Auth state
    session,
    user,
    isLoading,
    isAuthenticated,
    hasSetPassword,
    hasCompletedOnboarding,
    
    // Auth methods
    signIn,
    signUp,
    signInWithOtp,
    signOut,
    
    // Profile methods
    updateUserProfile,
    updateUserPassword,
    resetPassword,
    checkHasSetPassword,
    checkHasCompletedOnboarding,
  };
};
