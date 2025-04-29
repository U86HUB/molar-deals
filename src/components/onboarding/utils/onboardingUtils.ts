
import { UserData } from "../types";

export const validateStep = (step: number, userData: UserData): { valid: boolean; message?: string } => {
  switch (step) {
    case 1: // Personal Information
      if (!userData.name.trim()) {
        return { valid: false, message: "Please enter your name" };
      }
      return { valid: true };
      
    case 2: // Professional Details
      if (!userData.specialty.trim()) {
        return { valid: false, message: "Please select your specialty" };
      }
      return { valid: true };
      
    case 3: // Location
      if (!userData.country.trim()) {
        return { valid: false, message: "Please select your country" };
      }
      return { valid: true };
      
    case 4: // Preferences
      if (userData.dealPreferences.length === 0) {
        return { valid: false, message: "Please select at least one deal preference" };
      }
      return { valid: true };
      
    case 5: // Communication
      return { valid: true };
      
    case 6: // Review & Complete
      return { valid: true };
      
    default:
      return { valid: true };
  }
};

export const initialUserData: UserData = {
  name: "",
  email: "",
  phone: "",
  
  practiceName: "",
  specialty: "",
  yearsOfExperience: "0-5",
  practiceSize: "solo",
  
  country: "USA",
  state: "",
  city: "",
  streetAddress: "",
  postalCode: "",
  useGeolocation: false,
  
  dealPreferences: [],
  priceRangeMin: "0",
  priceRangeMax: "5000",
  preferredBrands: [],
  
  emailFrequency: "weekly",
  notificationTypes: ["deals", "account"],
  marketingConsent: false,
};

// Add a function to run a comprehensive validation on user data
export const validateAllUserData = (userData: UserData): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  // Personal info validation
  if (!userData.name.trim()) errors.name = "Name is required";
  if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Professional details validation
  if (!userData.specialty) errors.specialty = "Specialty is required";
  
  // Location validation
  if (!userData.country) errors.country = "Country is required";
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
