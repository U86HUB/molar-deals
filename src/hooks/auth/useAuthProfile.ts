
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/services/errorService";
import { validatePassword } from "@/utils/passwordUtils";
import { Json } from "@/integrations/supabase/types";

// Define our own interface for profile data
interface ProfileUpdateData {
  id?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  specialty?: string;
  years_experience?: string | number;
  professional_bio?: string; // Changed from bio to match DB field
  practice_name?: string;
  practice_size?: string | number;
  clinic_bio?: string;
  address_structured?: Json | null;
  coords?: string;
  location_source?: string;
  has_set_password?: boolean;
  onboarding_completed?: boolean;
}

export const useAuthProfile = () => {
  const updateUserProfile = async (data: ProfileUpdateData) => {
    try {
      // Only store essential auth-related data in user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          has_set_password: data.has_set_password || true,
          onboarding_completed: data.onboarding_completed
        }
      });

      if (authError) throw authError;
      
      // Get current user ID
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      if (!userId) {
        throw new Error("User ID not found");
      }
      
      // Convert years_experience to number if it's a string
      const yearsExperience = typeof data.years_experience === 'string' ? 
        parseInt(data.years_experience) || null : data.years_experience;
      
      // Convert practice_size to number if it's a string
      const practiceSize = typeof data.practice_size === 'string' ? 
        parseInt(data.practice_size) || null : data.practice_size;
      
      console.log("Upserting profile:", {
        id: userId,
        first_name: data.first_name,
        last_name: data.last_name,
        full_name: data.full_name,
        phone: data.phone,
        specialty: data.specialty,
        years_experience: yearsExperience,
        professional_bio: data.professional_bio,
        practice_name: data.practice_name,
        practice_size: practiceSize,
        clinic_bio: data.clinic_bio,
        address_structured: data.address_structured,
        location_source: data.location_source,
        coords: data.coords
      });
      
      // Store the rest of user profile data in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          first_name: data.first_name,
          last_name: data.last_name,
          full_name: data.full_name,
          phone: data.phone,
          specialty: data.specialty,
          years_experience: yearsExperience, 
          professional_bio: data.professional_bio, // Keep the same field name as in the DB
          practice_name: data.practice_name,
          practice_size: practiceSize,
          clinic_bio: data.clinic_bio,
          address_structured: data.address_structured,
          location_source: data.location_source,
          coords: data.coords
        }, { 
          onConflict: 'id'
        });

      if (profileError) {
        console.error("Profile update error:", profileError);
        throw profileError;
      }
      
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
