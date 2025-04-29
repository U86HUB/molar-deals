
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { OnboardingProgress } from "./components/OnboardingProgress";
import { OnboardingStepTitle } from "./components/OnboardingStepTitle";
import { OnboardingNavigation } from "./components/OnboardingNavigation"; 
import { PersonalInformationStep } from "./steps/PersonalInformationStep";
import { ProfessionalDetailsStep } from "./steps/ProfessionalDetailsStep";
import { LocationStep } from "./steps/LocationStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { CommunicationStep } from "./steps/CommunicationStep";
import { ReviewStep } from "./steps/ReviewStep";
import { OnboardingWizardProps, UserData } from "./types";
import { validateStep, initialUserData } from "./utils/onboardingUtils";
import { Database } from "@/integrations/supabase/types";

export const OnboardingWizard = ({ isOpen, onComplete, onClose }: OnboardingWizardProps) => {
  const { user } = useAuth();
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
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error("Error checking profile:", error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error("Exception checking profile:", error);
      return false;
    }
  };

  const createUserProfile = async (userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: userData.name,
          username: userData.email.split('@')[0]
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
      // Save user data to database if user is authenticated
      if (user?.id) {
        // First check if profile exists
        const profileExists = await checkProfileExists(user.id);
        
        if (!profileExists) {
          // Create profile if it doesn't exist
          const created = await createUserProfile(user.id);
          if (!created) {
            throw new Error("Failed to create user profile");
          }
        }
        
        // In the profiles table, update the existing record
        const profileUpdate = {
          full_name: userData.name,
          username: userData.email.split('@')[0]
        };
        
        const { error } = await supabase
          .from('profiles')
          .update(profileUpdate)
          .eq('id', user.id);
          
        if (error) {
          console.error("Profile update error:", error);
          throw error;
        }
        
        // Update user metadata with all onboarding information
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            onboarding_completed: true,
            has_set_password: true,
            specialty: userData.specialty,
            practice_name: userData.practiceName,
            preferences: userData.dealPreferences,
            communication_preferences: {
              email_frequency: userData.emailFrequency,
              notification_types: userData.notificationTypes,
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

  // Get current step title and description
  const getStepMetadata = () => {
    switch (step) {
      case 1:
        return {
          title: "Welcome to DentalDeals!",
          description: "Let's start by getting to know you better."
        };
      case 2:
        return {
          title: "Professional Details",
          description: "Tell us about your dental practice."
        };
      case 3:
        return {
          title: "Your Location",
          description: "Help us show deals near you."
        };
      case 4:
        return {
          title: "Deal Preferences",
          description: "Select your preferences to see relevant deals."
        };
      case 5:
        return {
          title: "Communication Preferences",
          description: "Choose how you'd like to hear from us."
        };
      case 6:
        return {
          title: "Review Your Information",
          description: "Please review your information before completing."
        };
      default:
        return {
          title: "",
          description: ""
        };
    }
  };

  // Check if current step can be skipped
  const canSkipCurrentStep = () => {
    return (step === 3 && !userData.useGeolocation) || step === 4 || step === 5;
  };

  // Render current step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PersonalInformationStep userData={userData} updateUserData={updateUserData} />;
      case 2:
        return <ProfessionalDetailsStep userData={userData} updateUserData={updateUserData} />;
      case 3:
        return <LocationStep userData={userData} updateUserData={updateUserData} />;
      case 4:
        return <PreferencesStep userData={userData} updateUserData={updateUserData} />;
      case 5:
        return <CommunicationStep userData={userData} updateUserData={updateUserData} />;
      case 6:
        return <ReviewStep userData={userData} updateUserData={updateUserData} setStep={setStep} />;
      default:
        return null;
    }
  };

  const { title, description } = getStepMetadata();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-lg max-h-[90vh] overflow-y-auto" aria-describedby="onboarding-description">
        {/* Add invisible description for accessibility */}
        <DialogDescription id="onboarding-description" className="sr-only">
          Complete your profile setup to customize your DentalDeals experience
        </DialogDescription>
        
        {/* Progress indicator */}
        <div className="px-6 pt-6">
          <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
        </div>

        <div className="p-6">
          <OnboardingStepTitle title={title} description={description} />

          <div className="space-y-6">
            {renderStepContent()}
          </div>

          <div className="mt-8">
            <OnboardingNavigation
              currentStep={step}
              totalSteps={totalSteps}
              onNext={handleNext}
              onBack={handleBack}
              onSkip={handleSkip}
              canSkip={canSkipCurrentStep()}
              isLastStep={step === totalSteps}
              isSubmitting={loading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
