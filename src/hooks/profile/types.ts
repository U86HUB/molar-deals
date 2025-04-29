
import { Json } from "@/integrations/supabase/types";
import { LocationSource, AddressStructured } from "@/stores/locationStore";

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
export interface DbProfile {
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
export type DbProfileExtended = DbProfile & {
  clinic_bio?: string | null;
};

// Type for profile data handlers
export interface ProfileDataHandlers {
  handleProfileDataChange: (field: string, value: string) => void;
  handleSave: (formData: ProfileFormData) => Promise<void>;
}
