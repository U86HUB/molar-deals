
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useLocationStore } from "@/stores/locationStore";

export interface ProfileFormData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  practiceName: string;
  specialty: string;
  yearsOfExperience: string;
  practiceSize: string;
  bio: string;
  clinicBio?: string; // New field for clinic bio
}

export function useProfileData() {
  const { user, updateUserProfile } = useAuth();
  const { addressStructured, coords, source, setLocation, isVerified, setVerified } = useLocationStore();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    practiceName: "",
    specialty: "General Dentist",
    yearsOfExperience: "0-5",
    practiceSize: "solo",
    bio: "",
    clinicBio: ""
  });

  // Load user data on mount
  useEffect(() => {
    if (user) {
      // First, set basic profile data
      setProfileData({
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
        firstName: user.user_metadata?.first_name || "",
        lastName: user.user_metadata?.last_name || "",
        phone: user.user_metadata?.phone || "",
        practiceName: user.user_metadata?.practice_name || "",
        specialty: user.user_metadata?.specialty || "General Dentist",
        yearsOfExperience: user.user_metadata?.years_of_experience || "0-5",
        practiceSize: user.user_metadata?.practice_size || "solo",
        bio: user.user_metadata?.bio || "",
        clinicBio: user.user_metadata?.clinic_bio || ""
      });
      
      // Then, set location data in the location store
      if (user.user_metadata?.address_structured) {
        setLocation({
          addressStructured: user.user_metadata.address_structured,
          source: user.user_metadata?.location_source || 'google',
          isVerified: true // Consider existing data as verified
        });
      }
      
      // If we have coords stored, set them as well
      if (user.user_metadata?.location?.coords) {
        setLocation({
          coords: user.user_metadata.location.coords
        });
      }
    }
  }, [user, setLocation]);
  
  const handleProfileDataChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = async (formData: ProfileFormData) => {
    setLoading(true);
    try {
      // Format full name
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      // Create formatted location metadata
      const locationMetadata = {
        country: addressStructured?.country || "",
        state: addressStructured?.state || "",
        city: addressStructured?.city || "",
        coords: coords || null
      };
      
      // Update user profile with all metadata
      await updateUserProfile({
        full_name: fullName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        practice_name: formData.practiceName,
        specialty: formData.specialty,
        years_of_experience: formData.yearsOfExperience,
        practice_size: formData.practiceSize,
        phone: formData.phone,
        bio: formData.bio,
        clinic_bio: formData.clinicBio, // Add the new clinic bio field
        address_structured: addressStructured || null,
        location: locationMetadata,
        location_source: source || 'google'
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
    loading,
    handleProfileDataChange,
    handleSave
  };
}
