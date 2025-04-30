
import { createContext, useContext, ReactNode } from "react";
import { AuthContextProps } from "@/types/auth.types";
import { Session, User } from "@supabase/supabase-js";

// Create a mock user and session for testing
const mockUser: User = {
  id: "mock-user-123",
  app_metadata: {},
  user_metadata: {
    role: "customer",
    has_set_password: true,
    onboarding_completed: true
  },
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "test@example.com",
  phone: "",
  role: "authenticated"
};

const mockSession: Session = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "bearer",
  user: mockUser
};

// Mock implementation of AuthContextProps
const mockAuthContext: AuthContextProps = {
  session: mockSession,
  user: mockUser,
  isLoading: false,
  isAuthenticated: true,
  hasSetPassword: true,
  hasCompletedOnboarding: true,
  
  // Auth methods that log but don't perform actual authentication
  signIn: async () => {
    console.log("Mock signIn called");
  },
  signUp: async () => {
    console.log("Mock signUp called");
  },
  signInWithOtp: async () => {
    console.log("Mock signInWithOtp called");
  },
  signOut: async () => {
    console.log("Mock signOut called");
    // In a real implementation, we might want to clear the mockAuth flag
    localStorage.removeItem("useMockAuth");
    window.location.reload();
  },
  
  // Profile methods that log but don't modify anything
  updateUserProfile: async () => {
    console.log("Mock updateUserProfile called");
  },
  updateUserPassword: async () => {
    console.log("Mock updateUserPassword called");
    return true;
  },
  resetPassword: async () => {
    console.log("Mock resetPassword called");
  },
  checkHasSetPassword: async () => true,
  checkHasCompletedOnboarding: () => true
};

const MockAuthContext = createContext<AuthContextProps>(mockAuthContext);

interface MockAuthProviderProps {
  children: ReactNode;
}

export function MockAuthProvider({ children }: MockAuthProviderProps) {
  return (
    <MockAuthContext.Provider value={mockAuthContext}>
      {children}
    </MockAuthContext.Provider>
  );
}

export const useMockAuth = () => useContext(MockAuthContext);

