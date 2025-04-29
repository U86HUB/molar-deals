
interface StepInfo {
  title: string;
  description: string;
}

export const getStepMetadata = (step: number): StepInfo => {
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
