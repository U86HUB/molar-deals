import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormData } from "@/hooks/useProfileData";
import { AddressSelector } from "./AddressSelector";

interface ProfessionalInfoSectionProps {
  profileData: ProfileFormData;
  onChange: (field: string, value: string) => void;
  googleMapsApiKey: string;
}

export const ProfessionalInfoSection = ({ profileData, onChange, googleMapsApiKey }: ProfessionalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="practiceName">Practice Name</Label>
        <Input
          id="practiceName"
          value={profileData.practiceName || ""}
          onChange={(e) => onChange("practiceName", e.target.value)}
          placeholder="Practice Name"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialty">Specialty</Label>
          <Select 
            value={profileData.specialty || "General Dentist"} 
            onValueChange={(value) => onChange("specialty", value)}
          >
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Dentist">General Dentist</SelectItem>
              <SelectItem value="Orthodontist">Orthodontist</SelectItem>
              <SelectItem value="Periodontist">Periodontist</SelectItem>
              <SelectItem value="Oral Surgeon">Oral Surgeon</SelectItem>
              <SelectItem value="Endodontist">Endodontist</SelectItem>
              <SelectItem value="Pediatric Dentist">Pediatric Dentist</SelectItem>
              <SelectItem value="Prosthodontist">Prosthodontist</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Select 
            value={profileData.yearsOfExperience || "0-5"} 
            onValueChange={(value) => onChange("yearsOfExperience", value)}
          >
            <SelectTrigger id="yearsOfExperience">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-5">0-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="11-20">11-20 years</SelectItem>
              <SelectItem value="20+">20+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="practiceSize">Practice Size</Label>
        <Select 
          value={profileData.practiceSize || "solo"} 
          onValueChange={(value) => onChange("practiceSize", value)}
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
      
      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio</Label>
        <Textarea
          id="bio"
          value={profileData.bio || ""}
          onChange={(e) => onChange("bio", e.target.value)}
          placeholder="Tell us about your professional background and practice"
          rows={4}
        />
      </div>
      
      <div className="space-y-2 pt-4">
        <AddressSelector googleMapsApiKey={googleMapsApiKey} />
      </div>
    </div>
  );
};
