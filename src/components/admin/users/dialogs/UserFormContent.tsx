
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { UserFormField } from "./UserFormField";
import { UserRoleSelect } from "./UserRoleSelect";
import { UserStatusSelect } from "./UserStatusSelect";
import { SubscriptionPlanSelect } from "./SubscriptionPlanSelect";
import { UserProfile, UserRole, UserStatus } from "@/services/user/types";

interface UserFormContentProps {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  name: string;
  setName: (name: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  status: UserStatus;
  setStatus: (status: UserStatus) => void;
  location: string;
  setLocation: (location: string) => void;
  subscriptionPlan: string;
  setSubscriptionPlan: (plan: string) => void;
}

export const UserFormContent = ({
  user,
  loading,
  error,
  name,
  setName,
  role,
  setRole,
  status,
  setStatus,
  location,
  setLocation,
  subscriptionPlan,
  setSubscriptionPlan
}: UserFormContentProps) => {
  if (loading && !user) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 py-4">
      <UserFormField
        id="email"
        label="Email"
        value={user?.email || ""}
        disabled
        helpText="Email cannot be changed"
      />
      
      <UserFormField
        id="name"
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <UserRoleSelect
        value={role}
        onValueChange={setRole}
      />
      
      <UserStatusSelect
        value={status}
        onValueChange={setStatus}
      />
      
      <UserFormField
        id="location"
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      
      <SubscriptionPlanSelect
        value={subscriptionPlan}
        onValueChange={setSubscriptionPlan}
      />
    </div>
  );
};
