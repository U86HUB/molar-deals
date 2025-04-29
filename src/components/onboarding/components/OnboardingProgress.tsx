
import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  isLoading?: boolean;
}

export const OnboardingProgress = ({ 
  currentStep, 
  totalSteps, 
  isLoading = false 
}: OnboardingProgressProps) => {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <>
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{isLoading ? "Loading..." : `${progressPercentage}% Complete`}</span>
      </div>
      <Progress 
        value={progressPercentage} 
        indeterminate={isLoading}
        className="h-2"
      />
    </>
  );
};
