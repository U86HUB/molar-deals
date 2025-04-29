
import { supabase } from "@/integrations/supabase/client";
import { UserStatus, UserRole, UserProfile } from "./types";
import { toast } from "sonner";

export const userModifyService = {
  /**
   * Update user status
   */
  async updateUserStatus(userId: string, status: UserStatus): Promise<void> {
    try {
      if (status === 'Suspended') {
        // Use admin.updateUserById with the correct property
        const { error } = await supabase.auth.admin.updateUserById(
          userId,
          { user_metadata: { status, is_banned: true } }
        );
        if (error) throw error;
      } else if (status === 'Active' || status === 'Inactive') {
        // Unban the user if they were suspended
        const { error } = await supabase.auth.admin.updateUserById(
          userId,
          { user_metadata: { status, is_banned: false } }
        );
        if (error) throw error;
      }
      
      toast.success(`User status updated to ${status}`);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error(`Failed to update user status: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  /**
   * Update user verification status
   */
  async updateUserVerification(userId: string, verified: boolean): Promise<void> {
    try {
      if (verified) {
        // Mark email as confirmed
        const { error } = await supabase.auth.admin.updateUserById(
          userId,
          { email_confirm: true }
        );
        if (error) throw error;
        toast.success("User account verified successfully");
      } else {
        // We can't actually un-verify an email with Supabase, but we can update metadata
        const { error } = await supabase.auth.admin.updateUserById(
          userId,
          { user_metadata: { manually_unverified: true } }
        );
        if (error) throw error;
        toast.success("User verification status updated");
      }
    } catch (error) {
      console.error("Error updating user verification:", error);
      toast.error(`Failed to update verification: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: UserRole): Promise<void> {
    try {
      const { error } = await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { role } }
      );
      
      if (error) throw error;
      toast.success(`User role updated to ${role}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error(`Failed to update role: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(`Failed to delete user: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
    try {
      // Update auth metadata
      const { error: metadataError } = await supabase.auth.admin.updateUserById(
        userId,
        { 
          user_metadata: { 
            full_name: profileData.name,
            role: profileData.role,
            location: profileData.location,
            subscription_plan: profileData.subscriptionPlan
          } 
        }
      );
      
      if (metadataError) throw metadataError;
      
      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          full_name: profileData.name
        })
        .eq('id', userId);
      
      if (profileError) throw profileError;
      
      toast.success("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error(`Failed to update profile: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
};
