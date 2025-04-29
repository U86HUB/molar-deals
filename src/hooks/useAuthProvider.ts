
import { useAuthState } from "./auth/useAuthState";
import { useAuthMethods } from "./auth/useAuthMethods";
import { useAuthProfile } from "./auth/useAuthProfile";

export const useAuthProvider = () => {
  const { 
    session, 
    user, 
    isLoading, 
    hasSetPassword, 
    checkHasSetPassword, 
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
  };
};
