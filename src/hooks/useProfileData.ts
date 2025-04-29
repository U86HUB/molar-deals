
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useLocationStore, AddressStructured, LocationSource } from "@/stores/locationStore";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

// Define custom interfaces for our profile data
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
  clinicBio?: string;
}

// Interface for database profile structure
interface DbProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  practice_name?: string | null;
  specialty?: string | null;
  years_experience?: number | null;
  practice_size?: number | null;
  professional_bio?: string | null; // This is 'bio' in our form
  clinic_bio?: string | null;
  address_structured?: any;
  coords?: any;
  location_source?: string | null;
}

// Locally extend the interface to include clinic_bio if it's missing from types.ts
type DbProfileExtended = DbProfile & {
  clinic_bio?: string | null;
};

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

  // Load user data function that can be called after authentication is confirmed
  const loadProfileData = useCallback(async () => {
    if (!user) return;
    
    try {
      // First get the basic user info from auth
      const userEmail = user.email || "";
      
      console.log("Fetching profile for user ID:", user.id);
      
      // Then fetch the detailed profile from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
      
      if (data) {
        console.log("Profile data loaded:", data);
        // Set profile data from the profiles table
        setProfileData({
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          email: userEmail,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          phone: data.phone || '',
          practiceName: data.practice_name || '',
          specialty: data.specialty || 'General Dentist',
          yearsOfExperience: data.years_experience ? String(data.years_experience) : '0-5', // Convert to string
          practiceSize: data.practice_size ? String(data.practice_size) : 'solo',
          bio: data.professional_bio || '', // Map professional_bio to bio
          clinicBio: data.clinic_bio || ''
        });
        
        // Set location data in the location store
        if (data.address_structured) {
          setLocation({
            addressStructured: data.address_structured as AddressStructured,
            source: (data.location_source as LocationSource) || 'google',
            isVerified: true
          });
        }
        
        // If we have coords stored, set them as well
        if (data.coords) {
          // Extract coordinates from PostGIS point
          // Format will be something like: POINT(longitude latitude)
          const coordsStr = data.coords.toString();
          const match = coordsStr.match(/POINT\(([^ ]*) ([^)]*)\)/);
          
          if (match && match.length === 3) {
            const lng = parseFloat(match[1]);
            const lat = parseFloat(match[2]);
            
            setLocation({
              coords: { lat, lng }
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
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

      // Prepare profile data for update
      const profileUpdateData = {
        id: user?.id || '',
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
    profileData,
    loading,
    handleProfileDataChange,
    handleSave,
    loadProfileData
  };
}
