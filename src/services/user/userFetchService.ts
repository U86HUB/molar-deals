
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserListParams, ProfileData, mapAuthUserToProfile } from "./types";

export const userFetchService = {
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
        const profile = profiles?.find(p => p.id === authUser.id) as ProfileData | undefined;
        return mapAuthUserToProfile(authUser, profile || null);
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
      // Fix: Cast profileData to ProfileData type with a default empty object that includes the required id
      const profile = (profileData as ProfileData | null) || { id: userId };
      
      return mapAuthUserToProfile(user, profile);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }
};
