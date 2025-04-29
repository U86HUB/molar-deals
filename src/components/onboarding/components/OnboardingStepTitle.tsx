
import { ReactNode } from "react";

interface OnboardingStepTitleProps {
  title: string;
  description: string;
}

export const OnboardingStepTitle = ({ title, description }: OnboardingStepTitleProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
    </>
  );
};
