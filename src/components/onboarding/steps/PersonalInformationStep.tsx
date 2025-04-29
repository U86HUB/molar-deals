
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StepProps } from "../types";

export const PersonalInformationStep = ({ userData, updateUserData }: StepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={userData.name}
          onChange={(e) => updateUserData("name", e.target.value)}
          placeholder="Dr. Jane Smith"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={userData.email}
          onChange={(e) => updateUserData("email", e.target.value)}
          placeholder="jane.smith@example.com"
          disabled={userData.email !== ""}
        />
        {userData.email && (
          <p className="text-xs text-muted-foreground">
            Email address from your login information
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          value={userData.phone}
          onChange={(e) => updateUserData("phone", e.target.value)}
          placeholder="(123) 456-7890"
        />
      </div>
    </div>
  );
};
