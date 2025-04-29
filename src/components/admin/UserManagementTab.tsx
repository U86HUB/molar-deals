
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UserEditDialog } from "./UserEditDialog";
import { UserStatsCards } from "./users/UserStatsCards";
import { UserFilters } from "./users/UserFilters";
import { UsersTable } from "./users/UsersTable";
import { UserPagination } from "./users/UserPagination";
import { UserActionButtons } from "./users/UserActionButtons";
import { useUserManagement } from "@/hooks/admin/useUserManagement";

const UserManagementTab = () => {
  const {
    users,
    loading,
    error,
    stats,
    sortField,
    sortDirection,
    searchTerm,
    statusFilter,
    roleFilter,
    currentPage,
    totalPages,
    isEditDialogOpen,
    selectedUserId,
    
    setSearchTerm,
    setStatusFilter,
    setRoleFilter,
    setCurrentPage,
    resetFilters,
    handleSort,
    handleEditUser,
    handleVerifyUser,
    handleStatusChange,
    handleDeleteUser,
    handleUserUpdated,
    closeEditDialog
  } = useUserManagement();

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
        onClose={closeEditDialog}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};

export default UserManagementTab;
