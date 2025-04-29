
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserStatus } from "@/services/user/types";

interface UserStatusSelectProps {
  value: UserStatus;
  onValueChange: (value: UserStatus) => void;
}

export const UserStatusSelect = ({ value, onValueChange }: UserStatusSelectProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="status">Status</Label>
      <Select 
        value={value} 
        onValueChange={(value) => onValueChange(value as UserStatus)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
          <SelectItem value="Suspended">Suspended</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
