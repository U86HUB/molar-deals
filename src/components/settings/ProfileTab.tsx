
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { LocationData } from "@/components/shared/LocationSelector";
import { PhotoUploadSection } from "./profile/PhotoUploadSection";
import { BasicInfoSection } from "./profile/BasicInfoSection";
import { LocationSection } from "./profile/LocationSection";
import { BioSection } from "./profile/BioSection";

// Get Google Maps API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

export function ProfileTab() {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    practiceName: user?.user_metadata?.practice_name || "",
    specialty: user?.user_metadata?.specialty || "General Dentist",
    yearsOfExperience: user?.user_metadata?.years_of_experience || "0-5",
    practiceSize: user?.user_metadata?.practice_size || "solo",
    bio: user?.user_metadata?.bio || ""
  });
  
  const [locationData, setLocationData] = useState<LocationData>({
    locationType: "country",
    countryCode: user?.user_metadata?.location?.country || "",
    state: user?.user_metadata?.location?.state || "",
    city: user?.user_metadata?.location?.city || "",
    streetAddress: user?.user_metadata?.street_address || "",
    postalCode: user?.user_metadata?.postal_code || ""
  });
  
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
        practiceName: user.user_metadata?.practice_name || "",
        specialty: user.user_metadata?.specialty || "General Dentist",
        yearsOfExperience: user.user_metadata?.years_of_experience || "0-5",
        practiceSize: user.user_metadata?.practice_size || "solo",
        bio: user.user_metadata?.bio || ""
      });
      
      setLocationData({
        locationType: "country",
        countryCode: user.user_metadata?.location?.country || "",
        state: user.user_metadata?.location?.state || "",
        city: user.user_metadata?.location?.city || "",
        streetAddress: user.user_metadata?.street_address || "",
        postalCode: user.user_metadata?.postal_code || ""
      });
    }
  }, [user]);
  
  const handleProfileDataChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleBioChange = (bio: string) => {
    setProfileData(prev => ({
      ...prev,
      bio
    }));
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      // Format location data
      const locationMetadata = {
        country: locationData.countryCode || "",
        state: locationData.state || "",
        city: locationData.city || "",
        use_geolocation: false
      };
      
      await updateUserProfile({
        full_name: profileData.name,
        practice_name: profileData.practiceName,
        specialty: profileData.specialty,
        years_of_experience: profileData.yearsOfExperience,
        practice_size: profileData.practiceSize,
        phone: profileData.phone,
        bio: profileData.bio,
        street_address: locationData.streetAddress || "",
        postal_code: locationData.postalCode || "",
        location: locationMetadata
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  
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
