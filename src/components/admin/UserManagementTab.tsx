
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { userService, UserProfile, UserStatus } from "@/services/userService";
import { UserEditDialog } from "./UserEditDialog";
import { UserStatsCards } from "./users/UserStatsCards";
import { UserFilters } from "./users/UserFilters";
import { UsersTable } from "./users/UsersTable";
import { UserPagination } from "./users/UserPagination";
import { UserActionButtons } from "./users/UserActionButtons";

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const usersPerPage = 10;
  
  // State for users data
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // User statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    verificationRate: 0
  });
  
  // User edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Load users on component mount and when filters change
  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm, statusFilter, roleFilter, sortField, sortDirection]);

  // Load user stats
  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await userService.getUsers({
        page: currentPage,
        perPage: usersPerPage,
        searchTerm,
        statusFilter,
        roleFilter,
        sortField,
        sortDirection
      });
      
      setUsers(result.users);
      setTotalUsers(result.totalCount);
    } catch (err) {
      console.error("Error loading users:", err);
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      const userStats = await userService.getUserStats();
      setStats(userStats);
    } catch (err) {
      console.error("Error loading user stats:", err);
      toast.error("Failed to load user statistics");
    }
  };

  const resetFilters = () => {
    setStatusFilter(undefined);
    setRoleFilter(undefined);
    setSortField(undefined);
    setSortDirection("asc");
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsEditDialogOpen(true);
  };

  const handleVerifyUser = async (userId: string, verified: boolean) => {
    try {
      await userService.updateUserVerification(userId, verified);
      loadUsers();
    } catch (err) {
      console.error("Error updating verification:", err);
    }
  };

  const handleStatusChange = async (userId: string, status: UserStatus) => {
    try {
      await userService.updateUserStatus(userId, status);
      loadUsers();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await userService.deleteUser(userId);
        loadUsers();
        loadUserStats();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleUserUpdated = () => {
    loadUsers();
    loadUserStats();
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <UserActionButtons 
          onExportUsers={() => console.log("Export users")}
          onAddNewUser={() => console.log("Add new user")}
        />
      </div>
      
      <UserStatsCards stats={stats} />
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            resetFilters={resetFilters}
          />
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <UsersTable 
            users={users}
            loading={loading}
            error={error}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            handleEditUser={handleEditUser}
            handleVerifyUser={handleVerifyUser}
            handleStatusChange={handleStatusChange}
            handleDeleteUser={handleDeleteUser}
          />
          
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <UserEditDialog 
        userId={selectedUserId}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedUserId(null);
        }}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};

export default UserManagementTab;
