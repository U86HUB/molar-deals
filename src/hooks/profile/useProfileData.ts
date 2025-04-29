
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocationStore } from "@/stores/locationStore";
import { ProfileFormData } from "./types";
import { useLoadProfileData } from "./useLoadProfileData";
import { useSaveProfileData } from "./useSaveProfileData";

export type { ProfileFormData } from "./types";

export function useProfileData() {
  const { user, updateUserProfile } = useAuth();
  const { addressStructured, coords, source, setLocation } = useLocationStore();
  
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

  const { loadProfileData } = useLoadProfileData({ 
    user, 
    setProfileData, 
    setLocation 
  });
  
  const { loading, handleSave } = useSaveProfileData({
    user,
    addressStructured,
    coords,
    source,
    updateUserProfile
  });
  
  const handleProfileDataChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    profileData,
    loading,
    handleProfileDataChange,
    handleSave,
    loadProfileData
  };
}
