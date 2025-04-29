
import { User } from "@supabase/supabase-js";

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

// Define a type for the profile data from Supabase
export interface ProfileData {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  username?: string | null;
  [key: string]: any;
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

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  verificationRate: number;
}

export const mapAuthUserToProfile = (authUser: User, profile: ProfileData | null = null): UserProfile => {
  const metadata = authUser.user_metadata || {};
  
  return {
    id: authUser.id,
    email: authUser.email || '',
    name: metadata.full_name || profile?.full_name || '',
    role: (metadata.role as UserRole) || 'Dentist',
    status: metadata.is_banned ? 'Suspended' : 
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
};
