
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepProps } from "../types";
import { specialties } from "../data/onboardingOptions";

export const ProfessionalDetailsStep = ({ userData, updateUserData }: StepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="practiceName">Practice Name</Label>
        <Input
          id="practiceName"
          value={userData.practiceName}
          onChange={(e) => updateUserData("practiceName", e.target.value)}
          placeholder="Smith Dental Clinic"
        />
      </div>

      <div className="space-y-3">
        <Label>Your Specialty</Label>
        <RadioGroup
          value={userData.specialty}
          onValueChange={(value) => updateUserData("specialty", value)}
          className="grid grid-cols-2 gap-2"
        >
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <RadioGroupItem value={specialty} id={specialty} />
              <Label htmlFor={specialty} className="cursor-pointer">
                {specialty}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="yearsExperience">Years of Experience</Label>
        <Select
          value={userData.yearsOfExperience}
          onValueChange={(value) => updateUserData("yearsOfExperience", value)}
        >
          <SelectTrigger id="yearsExperience">
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
      
      <div className="space-y-3">
        <Label htmlFor="practiceSize">Practice Size</Label>
        <Select
          value={userData.practiceSize}
          onValueChange={(value) => updateUserData("practiceSize", value)}
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
