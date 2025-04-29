
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { UserData } from "../types";
import { validateStep, initialUserData } from "../utils/onboardingUtils";

export const useOnboardingWizard = (isOpen: boolean, onComplete: () => void) => {
  const { user, session } = useAuth();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [loading, setLoading] = useState(false);
  const totalSteps = 6;

  // Load saved progress from localStorage if available
  useEffect(() => {
    if (!isOpen) return; // Don't load data if wizard isn't open
    
    const savedProgress = localStorage.getItem("onboardingProgress");
    const savedData = localStorage.getItem("onboardingData");
    
    if (savedProgress) {
      setStep(parseInt(savedProgress));
    }
    
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
    
    // Pre-fill email if user is logged in
    if (user?.email) {
      setUserData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user, isOpen]);

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem("onboardingProgress", step.toString());
      localStorage.setItem("onboardingData", JSON.stringify(userData));
    }
  }, [step, userData, isOpen]);

  const updateUserData = <K extends keyof UserData>(field: K, value: UserData[K]) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const validation = validateStep(step, userData);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const checkProfileExists = async (userId: string): Promise<boolean> => {
    if (!session) {
      console.log("No session when checking profile");
      return false;
    }
    
    try {
      console.log("Checking if profile exists for user:", userId);
      // Directly use the access token from the session
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();
        
      if (error) {
        if (error.code !== 'PGRST116') {
          console.error("Error checking profile:", error);
        }
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error("Exception checking profile:", error);
      return false;
    }
  };

  const createUserProfile = async (userId: string): Promise<boolean> => {
    if (!session) {
      console.log("No session when creating profile");
      return false;
    }
    
    try {
      console.log("Creating profile for user:", userId);
      
      // Create minimal profile first
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: userData.name || 'User',
          username: userData.email ? userData.email.split('@')[0] : `user-${Date.now()}`
        });
        
      if (error) {
        console.error("Error creating profile:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Exception creating profile:", error);
      return false;
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      if (!user?.id || !session) {
        throw new Error("User is not authenticated");
      }
      
      // First check if profile exists
      const profileExists = await checkProfileExists(user.id);
      console.log("Profile exists:", profileExists);
      
      // Create profile if it doesn't exist
      if (!profileExists) {
        const created = await createUserProfile(user.id);
        if (!created) {
          throw new Error("Failed to create user profile");
        }
        console.log("Created new profile");
      }
      
      // Format notification types into an array
      const notificationTypes = userData.notificationTypes;
      
      // Update user metadata with all onboarding information
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          onboarding_completed: true,
          has_set_password: true,
          full_name: userData.name,
          specialty: userData.specialty,
          practice_name: userData.practiceName,
          years_of_experience: userData.yearsOfExperience,
          practice_size: userData.practiceSize,
          preferences: userData.dealPreferences,
          price_range_min: userData.priceRangeMin,
          price_range_max: userData.priceRangeMax,
          preferred_brands: userData.preferredBrands,
          phone: userData.phone,
          communication_preferences: {
            email_frequency: userData.emailFrequency,
            notification_types: notificationTypes,
            marketing_consent: userData.marketingConsent,
          },
          location: {
            country: userData.country,
            state: userData.state,
            city: userData.city,
            use_geolocation: userData.useGeolocation,
          }
        }
      });
          
      if (metadataError) {
        console.error("Metadata update error:", metadataError);
        throw metadataError;
      }
      
      // Clear onboarding data from localStorage after successful completion
      localStorage.removeItem("onboardingProgress");
      localStorage.removeItem("onboardingData");
      
      toast.success("Profile successfully created!");
      onComplete();
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("There was an error saving your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Only some steps can be skipped
    if (step === 3 && !userData.useGeolocation) {
      setStep(step + 1);
    } else if (step === 4 || step === 5) {
      setStep(step + 1);
    }
  };

  // Check if current step can be skipped
  const canSkipCurrentStep = () => {
    return (step === 3 && !userData.useGeolocation) || step === 4 || step === 5;
  };

  return {
    step,
    setStep,
    userData,
    updateUserData,
    totalSteps,
    handleNext,
    handleBack,
    handleSkip,
    canSkipCurrentStep,
    loading
  };
};
