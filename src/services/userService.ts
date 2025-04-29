import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';
export type UserRole = 'Admin' | 'Dentist' | 'Vendor' | 'Staff' | 'Practice Manager';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  status?: UserStatus;
  verified?: boolean;
  lastActive?: string;
  joinedAt?: string;
  location?: string;
  subscriptionPlan?: string;
}

export interface UserListParams {
  page: number;
  perPage: number;
  searchTerm?: string;
  statusFilter?: string;
  roleFilter?: string;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  verificationRate: number;
}

export const userService = {
  /**
   * Get all users with pagination, filtering and sorting
   */
  async getUsers(params: UserListParams): Promise<{ users: UserProfile[]; totalCount: number }> {
    try {
      const { page, perPage, searchTerm, statusFilter, roleFilter, sortField, sortDirection } = params;
      
      // Start with the base query to get all users from auth schema via admin API
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers({
        page: page,
        perPage: perPage
      });

      if (authError) throw authError;
      
      if (!authUsers?.users.length) {
        return { users: [], totalCount: 0 };
      }
      
      // Extract user IDs to fetch their profiles
      const userIds = authUsers.users.map(user => user.id);
      
      // Fetch profiles data for these users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds);
        
      if (profilesError) throw profilesError;

      // Combine auth data with profile data
      const users = authUsers.users.map(authUser => {
        const profile = profiles?.find(p => p.id === authUser.id) || {};
        const metadata = authUser.user_metadata || {};
        
        const user: UserProfile = {
          id: authUser.id,
          email: authUser.email || '',
          name: metadata.full_name || profile?.full_name || '',
          role: (metadata.role as UserRole) || 'Dentist',
          status: authUser.banned ? 'Suspended' : 
                 !authUser.confirmed_at ? 'Pending' : 
                 authUser.last_sign_in_at ? 'Active' : 'Inactive',
          verified: !!authUser.confirmed_at,
          lastActive: authUser.last_sign_in_at ? 
                     new Date(authUser.last_sign_in_at).toLocaleDateString() : 
                     'Never',
          joinedAt: authUser.created_at ? 
                  new Date(authUser.created_at).toLocaleDateString() : 
                  'Unknown',
          location: metadata.location || 'Not specified',
          subscriptionPlan: metadata.subscription_plan || 'Free'
        };
        
        return user;
      });
      
      // Apply filters and sorting in memory since they're not directly available via the API
      let filteredUsers = users;
      
      // Apply search filter
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.name?.toLowerCase().includes(lowerSearchTerm) ||
          user.email.toLowerCase().includes(lowerSearchTerm) ||
          user.id.toLowerCase().includes(lowerSearchTerm) ||
          user.role?.toLowerCase().includes(lowerSearchTerm)
        );
      }
      
      // Apply status filter
      if (statusFilter) {
        filteredUsers = filteredUsers.filter(user => 
          user.status === statusFilter
        );
      }
      
      // Apply role filter
      if (roleFilter) {
        filteredUsers = filteredUsers.filter(user => 
          user.role === roleFilter
        );
      }
      
      // Apply sorting
      if (sortField) {
        filteredUsers.sort((a, b) => {
          const fieldA = a[sortField as keyof UserProfile];
          const fieldB = b[sortField as keyof UserProfile];
          
          if (fieldA === undefined) return sortDirection === 'asc' ? -1 : 1;
          if (fieldB === undefined) return sortDirection === 'asc' ? 1 : -1;
          
          if (typeof fieldA === 'string' && typeof fieldB === 'string') {
            return sortDirection === 'asc' 
              ? fieldA.localeCompare(fieldB) 
              : fieldB.localeCompare(fieldA);
          }
          
          return 0;
        });
      }
      
      return { 
        users: filteredUsers, 
        totalCount: filteredUsers.length 
      };
      
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<UserStats> {
    try {
      // Get all users for calculating statistics
      const { data: authUsers, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;

      const users = authUsers?.users || [];
      const totalUsers = users.length;
      
      // Calculate active users (users who have signed in recently)
      const activeUsers = users.filter(user => {
        if (!user.last_sign_in_at) return false;
        const lastSignIn = new Date(user.last_sign_in_at);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastSignIn > thirtyDaysAgo;
      }).length;
      
      // Calculate new users in the last 30 days
      const newUsers = users.filter(user => {
        if (!user.created_at) return false;
        const createdAt = new Date(user.created_at);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return createdAt > thirtyDaysAgo;
      }).length;
      
      // Calculate verification rate
      const verifiedUsers = users.filter(user => !!user.confirmed_at).length;
      const verificationRate = totalUsers > 0 ? Math.round((verifiedUsers / totalUsers) * 100) : 0;
      
      return {
        totalUsers,
        activeUsers,
        newUsers,
        verificationRate
      };
    } catch (error) {
      console.error("Error getting user stats:", error);
      throw error;
    }
  },

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
      toast.error(`Failed to update verification: ${error.message}`);
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
      toast.error(`Failed to update role: ${error.message}`);
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
      toast.error(`Failed to delete user: ${error.message}`);
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase.auth.admin.getUserById(userId);
      
      if (error) throw error;
      if (!data.user) return null;
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      
      const user = data.user;
      const profile = profileData || {};
      const metadata = user.user_metadata || {};
      
      return {
        id: user.id,
        email: user.email || '',
        name: metadata.full_name || profile?.full_name || '',
        role: (metadata.role as UserRole) || 'Dentist',
        status: metadata.is_banned ? 'Suspended' : 
               !user.confirmed_at ? 'Pending' : 
               user.last_sign_in_at ? 'Active' : 'Inactive',
        verified: !!user.confirmed_at,
        lastActive: user.last_sign_in_at ? 
                   new Date(user.last_sign_in_at).toLocaleDateString() : 
                   'Never',
        joinedAt: user.created_at ? 
                new Date(user.created_at).toLocaleDateString() : 
                'Unknown',
        location: metadata.location || 'Not specified',
        subscriptionPlan: metadata.subscription_plan || 'Free'
      };
    } catch (error) {
      console.error("Error getting user by ID:", error);
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
      toast.error(`Failed to update profile: ${error.message}`);
      throw error;
    }
  }
};
