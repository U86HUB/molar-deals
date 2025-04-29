
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { useProfileData } from "@/hooks/useProfileData";
import { PhotoUploadSection } from "./profile/PhotoUploadSection";
import { BasicInfoSection } from "./profile/BasicInfoSection";
import { LocationSection } from "./profile/LocationSection";
import { BioSection } from "./profile/BioSection";

// Get Google Maps API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

export function ProfileTab() {
  const {
    profileData,
    locationData,
    loading,
    setLocationData,
    handleProfileDataChange,
    handleBioChange,
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
      <CardContent className="space-y-6">
        <PhotoUploadSection name={profileData.name} />
        
        <BasicInfoSection 
          profileData={profileData} 
          onChange={handleProfileDataChange} 
        />
        
        <LocationSection 
          locationData={locationData}
          onChange={setLocationData}
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        />
        
        <BioSection 
          bio={profileData.bio}
          onChange={handleBioChange}
        />
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
