
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/services/user/types";

interface UserRoleSelectProps {
  value: UserRole;
  onValueChange: (value: UserRole) => void;
}

export const UserRoleSelect = ({ value, onValueChange }: UserRoleSelectProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="role">Role</Label>
      <Select 
        value={value} 
        onValueChange={(value) => onValueChange(value as UserRole)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Dentist">Dentist</SelectItem>
          <SelectItem value="Vendor">Vendor</SelectItem>
          <SelectItem value="Staff">Staff</SelectItem>
          <SelectItem value="Practice Manager">Practice Manager</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
