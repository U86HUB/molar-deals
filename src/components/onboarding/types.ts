
export interface UserData {
  // Personal information
  name: string;
  email: string;
  phone: string;
  
  // Professional details
  practiceName: string;
  specialty: string;
  yearsOfExperience: string;
  practiceSize: string;
  bio?: string;
  
  // Location and Address
  country: string; // Can be "GLOBAL" or a country code
  state: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  useGeolocation: boolean;
  
  // Preferences
  dealPreferences: string[];
  priceRangeMin: string;
  priceRangeMax: string;
  preferredBrands: string[];
  
  // Communication
  emailFrequency: string;
  notificationTypes: string[];
  marketingConsent: boolean;
}

export interface StepProps {
  userData: UserData;
  updateUserData: <K extends keyof UserData>(field: K, value: UserData[K]) => void;
}

export interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

// Add a type for our user metadata
export interface UserMetadata {
  full_name?: string;
  username?: string;
  role?: string;
  practice_name?: string;
  specialty?: string;
  years_of_experience?: string;
  practice_size?: string;
  bio?: string;
  phone?: string;
  preferences?: string[];
  price_range_min?: string;
  price_range_max?: string;
  preferred_brands?: string[];
  street_address?: string;
  postal_code?: string;
  location?: {
    country?: string;
    state?: string;
    city?: string;
    use_geolocation?: boolean;
  };
  communication_preferences?: {
    email_frequency?: string;
    notification_types?: string[];
    marketing_consent?: boolean;
  };
  [key: string]: any;
}
