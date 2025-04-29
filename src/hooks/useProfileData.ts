
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useLocationStore, AddressStructured, LocationSource } from "@/stores/locationStore";
import { supabase } from "@/integrations/supabase/client";

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

// Define our own interface for Profiles to avoid modifying read-only types
interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  email?: string;
  phone?: string;
  practice_name?: string;
  specialty?: string;
  years_experience?: string | number;
  practice_size?: string;
  bio?: string;
  clinic_bio?: string;
  address_structured?: any;
  coords?: any;
  location_source?: string;
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
      // First get the basic user info from auth
      const userEmail = user.email || "";
      
      // Then fetch the detailed profile from profiles table
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          
          if (data) {
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
              practiceSize: data.practice_size || 'solo',
              bio: data.bio || '',
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
        }
      };
      
      fetchProfile();
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
      const profileUpdateData: ProfileData = {
        id: user?.id || '',
        full_name: fullName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        practice_name: formData.practiceName,
        specialty: formData.specialty,
        years_experience: formData.yearsOfExperience, // This will be passed as a string
        practice_size: formData.practiceSize,
        phone: formData.phone,
        bio: formData.bio,
        clinic_bio: formData.clinicBio,
        address_structured: addressStructured || undefined,
        location_source: source || 'google'
      };
      
      // Add coordinates if available
      const profileDataWithCoords = coords ? {
        ...profileUpdateData,
        coords: `POINT(${coords.lng} ${coords.lat})`
      } : profileUpdateData;

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
    handleSave
  };
}
