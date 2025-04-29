
import { createContext, useContext, ReactNode } from "react";
import { useAuthProvider } from "@/hooks/useAuthProvider";
import { AuthContextProps } from "@/types/auth.types";

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
  updateUserPassword: async () => false,
  hasSetPassword: false,
  hasCompletedOnboarding: null,
  checkHasSetPassword: async () => false,
  checkHasCompletedOnboarding: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
