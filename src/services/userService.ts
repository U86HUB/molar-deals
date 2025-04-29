
import { userFetchService } from "./user/userFetchService";
import { userStatsService } from "./user/userStatsService";
import { userModifyService } from "./user/userModifyService";

// Re-export types with 'export type' to fix TS1205 error with isolatedModules
export type { UserStatus, UserRole, UserProfile, UserListParams } from "./user/types";

export const userService = {
  // User fetching methods
  getUsers: userFetchService.getUsers,
  getUserById: userFetchService.getUserById,
  
  // User stats methods
  getUserStats: userStatsService.getUserStats,
  
  // User modification methods
  updateUserStatus: userModifyService.updateUserStatus,
  updateUserVerification: userModifyService.updateUserVerification,
  updateUserRole: userModifyService.updateUserRole,
  deleteUser: userModifyService.deleteUser,
  updateUserProfile: userModifyService.updateUserProfile
};
