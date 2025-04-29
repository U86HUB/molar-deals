
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileFormData } from "@/hooks/useProfileData";

interface PersonalInfoSectionProps {
  profileData: ProfileFormData;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({ profileData, onChange }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={profileData.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="First Name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={profileData.lastName || ""}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Last Name"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={profileData.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Email Address"
          disabled
        />
        <p className="text-xs text-muted-foreground">
          Your email address is managed by your account settings.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={profileData.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Phone Number"
        />
      </div>
    </div>
  );
};
