
import { supabase } from "@/integrations/supabase/client";
import { UserStats } from "./types";

export const userStatsService = {
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
  }
};
