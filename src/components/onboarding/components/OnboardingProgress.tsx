
import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <>
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{progressPercentage}% Complete</span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2"
      />
    </>
  );
};
