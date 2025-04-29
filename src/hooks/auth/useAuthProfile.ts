
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";
import { validatePassword } from "@/utils/passwordUtils";
import { UserMetadata } from "@/components/onboarding/types";

export const useAuthProfile = () => {
  const updateUserProfile = async (data: Record<string, any>) => {
    try {
      // Only store essential auth-related data in user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          has_set_password: data.has_set_password || true,
          onboarding_completed: data.onboarding_completed
        }
      });

      if (authError) throw authError;
      
      // Store the rest of user profile data in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: (await supabase.auth.getUser()).data.user?.id,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          specialty: data.specialty,
          years_experience: data.years_of_experience, // Note: DB column is years_experience
          bio: data.bio,
          practice_name: data.practice_name,
          practice_size: data.practice_size,
          clinic_bio: data.clinic_bio,
          address_structured: data.address_structured,
          location_source: data.location_source
        }, { 
          onConflict: 'id'
        });

      if (profileError) throw profileError;
      
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
