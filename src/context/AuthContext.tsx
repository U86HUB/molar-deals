
import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useAuthProvider } from "@/hooks/useAuthProvider";
import { AuthContextProps } from "@/types/auth.types";
import { MockAuthProvider, useMockAuth } from "./MockAuthContext";

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

// This component will determine which auth provider to use
export function AuthProvider({ children }: { children: ReactNode }) {
  const [useMockAuth, setUseMockAuth] = useState<boolean>(false);
  
  useEffect(() => {
    // Check localStorage for mock auth setting
    const mockAuthEnabled = localStorage.getItem("useMockAuth") === "true";
    setUseMockAuth(mockAuthEnabled);

    // Watch for changes to the localStorage setting
    const handleStorageChange = () => {
      const newMockAuthEnabled = localStorage.getItem("useMockAuth") === "true";
      if (newMockAuthEnabled !== useMockAuth) {
        setUseMockAuth(newMockAuthEnabled);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [useMockAuth]);

  // Choose between real or mock authentication
  if (useMockAuth) {
    return <MockAuthProvider>{children}</MockAuthProvider>;
  }

  // Use the real authentication
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
