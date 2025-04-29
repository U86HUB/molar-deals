
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { specialties } from "@/components/onboarding/data/onboardingOptions";

interface BasicInfoSectionProps {
  profileData: {
    name: string;
    email: string;
    phone: string;
    practiceName: string;
    specialty: string;
    yearsOfExperience: string;
    practiceSize: string;
  };
  onChange: (field: string, value: string) => void;
}

export const BasicInfoSection = ({ profileData, onChange }: BasicInfoSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          value={profileData.name}
          onChange={e => onChange("name", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" value={profileData.email} readOnly />
        <p className="text-xs text-muted-foreground">
          Your email cannot be changed
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          value={profileData.phone}
          onChange={e => onChange("phone", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="practice">Practice Name</Label>
        <Input 
          id="practice" 
          value={profileData.practiceName}
          onChange={e => onChange("practiceName", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="specialty">Specialty</Label>
        <Select 
          value={profileData.specialty}
          onValueChange={value => onChange("specialty", value)}
        >
          <SelectTrigger id="specialty">
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map(specialty => (
              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
        <Select 
          value={profileData.yearsOfExperience}
          onValueChange={value => onChange("yearsOfExperience", value)}
        >
          <SelectTrigger id="yearsOfExperience">
            <SelectValue placeholder="Select years of experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-5">0-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="11-20">11-20 years</SelectItem>
            <SelectItem value="20+">20+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="practiceSize">Practice Size</Label>
        <Select 
          value={profileData.practiceSize}
          onValueChange={value => onChange("practiceSize", value)}
        >
          <SelectTrigger id="practiceSize">
            <SelectValue placeholder="Select practice size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solo">Solo Practice</SelectItem>
            <SelectItem value="small">Small Group (2-5 dentists)</SelectItem>
            <SelectItem value="medium">Medium Group (6-20 dentists)</SelectItem>
            <SelectItem value="large">Large Group / DSO (20+ dentists)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
