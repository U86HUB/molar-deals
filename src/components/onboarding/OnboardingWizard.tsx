
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { OnboardingProgress } from "./components/OnboardingProgress";
import { OnboardingStepTitle } from "./components/OnboardingStepTitle";
import { OnboardingNavigation } from "./components/OnboardingNavigation"; 
import { StepContent } from "./components/StepContent";
import { OnboardingWizardProps } from "./types";
import { useOnboardingWizard } from "./hooks/useOnboardingWizard";
import { getStepMetadata } from "./utils/stepMetadata";

export const OnboardingWizard = ({ isOpen, onComplete, onClose }: OnboardingWizardProps) => {
  const {
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
  } = useOnboardingWizard(isOpen, onComplete);

  const { title, description } = getStepMetadata(step);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-lg max-h-[90vh] overflow-y-auto">
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
            <StepContent 
              step={step} 
              userData={userData} 
              updateUserData={updateUserData}
              setStep={setStep}
            />
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
