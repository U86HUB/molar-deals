import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileFormData, DbProfile } from "./types";
import { User } from "@supabase/supabase-js";
import { AddressStructured, LocationSource } from "@/stores/locationStore";

interface UseLoadProfileDataParams {
  user: User | null;
  setProfileData: (data: ProfileFormData | ((prev: ProfileFormData) => ProfileFormData)) => void;
  setLocation: (data: {
    addressStructured?: AddressStructured;
    source?: LocationSource;
    coords?: { lat: number; lng: number };
    isVerified?: boolean;
  }) => void;
}

export function useLoadProfileData({ user, setProfileData, setLocation }: UseLoadProfileDataParams) {
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
        .maybeSingle(); // Use maybeSingle() instead of single()
        
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
      } else {
        // If no profile exists yet, just use the basic user info
        const userEmail = user.email || "";
        console.log("No profile data found, using basic user info");
        
        // Keep the default values from state initialization
        setProfileData(prev => ({
          ...prev,
          email: userEmail
        }));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Don't show an error toast for common cases like no profile found
    }
  }, [user, setProfileData, setLocation]);

  return { loadProfileData };
}
