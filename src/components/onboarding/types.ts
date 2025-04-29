
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
  
  // Location
  country: string;
  state: string;
  city: string;
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
