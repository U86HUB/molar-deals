
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { LocationData } from "@/components/shared/LocationSelector";

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  practiceName: string;
  specialty: string;
  yearsOfExperience: string;
  practiceSize: string;
  bio: string;
}

export function useProfileData() {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    practiceName: "",
    specialty: "General Dentist",
    yearsOfExperience: "0-5",
    practiceSize: "solo",
    bio: ""
  });
  
  const [locationData, setLocationData] = useState<LocationData>({
    locationType: "country",
    countryCode: "",
    state: "",
    city: "",
    streetAddress: "",
    postalCode: ""
  });

  // Load user data on mount
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

  return {
    profileData,
    locationData,
    loading,
    setLocationData,
    handleProfileDataChange,
    handleBioChange,
    handleSave
  };
}
