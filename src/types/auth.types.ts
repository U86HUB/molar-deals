
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    role?: string;
  }) => Promise<void>;
  signInWithOtp: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  updateUserProfile: (data: { username?: string; full_name?: string; role?: string }) => Promise<void>;
  updateUserPassword: (password: string) => Promise<boolean>; // Updated to return Promise<boolean>
  hasSetPassword: boolean;
  checkHasSetPassword: () => Promise<boolean>;
}
