
import { PersonalInformationStep } from "../steps/PersonalInformationStep";
import { ProfessionalDetailsStep } from "../steps/ProfessionalDetailsStep";
import { LocationStep } from "../steps/LocationStep";
import { PreferencesStep } from "../steps/PreferencesStep";
import { CommunicationStep } from "../steps/CommunicationStep";
import { ReviewStep } from "../steps/ReviewStep";
import { StepProps } from "../types";

interface StepContentProps extends StepProps {
  step: number;
  setStep: (step: number) => void;
}

export const StepContent = ({ step, userData, updateUserData, setStep }: StepContentProps) => {
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
