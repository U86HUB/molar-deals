
import { useState } from "react";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { ProfileFormData } from "./types";
import { useAuth } from "@/context/AuthContext";
import { AddressStructured, Coordinates, LocationSource } from "@/stores/locationStore";

interface UseSaveProfileDataParams {
  user: User | null;
  addressStructured?: AddressStructured;
  coords?: Coordinates;
  source?: LocationSource;
  updateUserProfile: (data: Record<string, any>) => Promise<void>;
}

export function useSaveProfileData({ 
  user, 
  addressStructured, 
  coords, 
  source, 
  updateUserProfile 
}: UseSaveProfileDataParams) {
  const [loading, setLoading] = useState(false);

  const handleSave = async (formData: ProfileFormData) => {
    if (!user) {
      toast.error("You must be logged in to save profile data");
      return;
    }
    
    setLoading(true);
    try {
      // Format full name
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Prepare profile data for update
      const profileUpdateData = {
        id: user.id,
        full_name: fullName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        practice_name: formData.practiceName,
        specialty: formData.specialty,
        years_experience: formData.yearsOfExperience, // Will be converted to number in updateUserProfile
        practice_size: formData.practiceSize,
        phone: formData.phone,
        professional_bio: formData.bio, // Map bio to professional_bio
        clinic_bio: formData.clinicBio,
        address_structured: addressStructured || undefined,
        location_source: source || 'google'
      };
      
      // Add coordinates if available
      const profileDataWithCoords = coords ? {
        ...profileUpdateData,
        coords: `POINT(${coords.lng} ${coords.lat})`
      } : profileUpdateData;

      console.log("Saving profile data:", profileDataWithCoords);

      // Update user profile
      await updateUserProfile(profileDataWithCoords);
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSave
  };
}
