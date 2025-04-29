
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  canSkip?: boolean;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}

export const OnboardingNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
  canSkip,
  isLastStep = false,
  isSubmitting = false,
}: OnboardingNavigationProps) => {
  return (
    <div className="flex justify-between">
      {currentStep > 1 ? (
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <div /> // Empty div to maintain spacing
      )}

      <div className="flex gap-2">
        {/* Skip button for optional steps */}
        {canSkip && onSkip && (
          <Button type="button" variant="ghost" onClick={onSkip}>
            Skip
          </Button>
        )}
        
        <Button 
          type="button" 
          variant={isLastStep ? "success" : "primary"} 
          onClick={onNext}
          disabled={isSubmitting}
        >
          {isLastStep ? (
            <>
              {!isSubmitting && <Check className="mr-2 h-4 w-4" />}
              Complete
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
