
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";
import { validatePassword } from "@/utils/passwordUtils";

export const useAuthProfile = () => {
  const updateUserProfile = async (data: Record<string, any>) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data
      });

      if (error) throw error;
      
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error updating profile");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.updateUserProfile');
      }
      throw error;
    }
  };

  const updateUserPassword = async (password: string) => {
    try {
      // Validate password before sending to Supabase
      const isPasswordValid = await validatePassword(password);
      
      if (!isPasswordValid) {
        // The validatePassword function already shows toast messages
        return false;
      }
      
      const { error } = await supabase.auth.updateUser({
        password,
        data: {
          has_set_password: true
        }
      });

      if (error) throw error;
      
      toast.success("Password set successfully!");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Error setting password");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.updateUserPassword');
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      toast.success("Password reset link sent to your email!");
    } catch (error: any) {
      toast.error(error.message || "Error resetting password");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.resetPassword');
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully signed out!");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
      if (error instanceof Error) {
        trackError(error, 'AuthProvider.signOut');
      }
      throw error;
    }
  };

  return {
    updateUserProfile,
    updateUserPassword,
    resetPassword,
    signOut
  };
};
