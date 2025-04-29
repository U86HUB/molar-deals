
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { UserProfile, UserStatus } from "@/services/userService";
import { Check, Loader2, X } from "lucide-react";

interface UsersTableProps {
  users: UserProfile[];
  loading: boolean;
  error: string | null;
  sortField?: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  handleEditUser: (userId: string) => void;
  handleVerifyUser: (userId: string, verified: boolean) => void;
  handleStatusChange: (userId: string, status: UserStatus) => void;
  handleDeleteUser: (userId: string) => void;
}

export const UsersTable = ({
  users,
  loading,
  error,
  sortField,
  sortDirection,
  handleSort,
  handleEditUser,
  handleVerifyUser,
  handleStatusChange,
  handleDeleteUser
}: UsersTableProps) => {
  const statusColors = {
    'Active': 'bg-green-100 text-green-700',
    'Inactive': 'bg-gray-100 text-gray-700',
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Suspended': 'bg-red-100 text-red-700'
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
              User ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('role')}>
              Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
              Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Verified</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('lastActive')}>
              Last Active {sortField === 'lastActive' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                  <span>Loading users...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id.slice(0, 8)}...</TableCell>
                <TableCell>{user.name || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={
                    user.role === 'Admin' ? "default" : 
                    user.role === 'Vendor' ? "outline" : 
                    "secondary"
                  }>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700'}`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  {user.verified ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => 
                        handleStatusChange(user.id, user.status === 'Active' ? 'Inactive' : 'Active')
                      }>
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'} Account
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => 
                        handleVerifyUser(user.id, !user.verified)
                      }>
                        {user.verified ? 'Remove Verification' : 'Verify Account'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                No users found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
