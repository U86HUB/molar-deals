
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasSetPassword: boolean;
  hasCompletedOnboarding: boolean | null;
  
  // Auth methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: { username?: string; full_name?: string; role?: string }) => Promise<void>;
  signInWithOtp: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  
  // Profile methods
  updateUserProfile: (data: { username?: string; full_name?: string; role?: string }) => Promise<void>;
  updateUserPassword: (password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  checkHasSetPassword: () => Promise<boolean>;
  checkHasCompletedOnboarding: () => boolean;
}
