
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { useProfileData } from "@/hooks/useProfileData";
import { PhotoUploadSection } from "./profile/PhotoUploadSection";
import { PersonalInfoSection } from "./profile/PersonalInfoSection";
import { ProfessionalInfoSection } from "./profile/ProfessionalInfoSection";

// Get Google Maps API key from environment variables - using the exact env var name
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

export function ProfileTab() {
  const {
    profileData,
    loading,
    handleProfileDataChange,
    handleSave
  } = useProfileData();
  
  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p className="text-muted-foreground">
          Update your personal information and how it appears to others
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <PhotoUploadSection name={profileData.name} />
        
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <PersonalInfoSection 
            profileData={profileData} 
            onChange={handleProfileDataChange} 
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Professional Information</h3>
          <ProfessionalInfoSection 
            profileData={profileData}
            onChange={handleProfileDataChange}
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          />
        </div>
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
