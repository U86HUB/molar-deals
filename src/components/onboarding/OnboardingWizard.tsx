
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

interface UserData {
  name: string;
  country: string;
  specialty: string;
  practiceName: string;
  preferences: string[];
  marketingConsent: boolean;
}

const initialUserData: UserData = {
  name: "",
  country: "USA",
  specialty: "",
  practiceName: "",
  preferences: [],
  marketingConsent: false,
};

export const OnboardingWizard = ({ isOpen, onComplete, onClose }: OnboardingWizardProps) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [loading, setLoading] = useState(false);

  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePreference = (preference: string) => {
    if (userData.preferences.includes(preference)) {
      updateUserData(
        "preferences",
        userData.preferences.filter((p) => p !== preference)
      );
    } else {
      updateUserData("preferences", [...userData.preferences, preference]);
    }
  };

  const handleNext = () => {
    // Validate current step
    if (step === 1 && (!userData.name || !userData.country)) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (step === 2 && !userData.specialty) {
      toast.error("Please select your specialty");
      return;
    }

    if (step < 3) {
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

  const handleComplete = () => {
    setLoading(true);
    // Simulate saving user data
    setTimeout(() => {
      toast.success("Profile successfully created!");
      setLoading(false);
      onComplete();
    }, 1500);
  };

  // List of specialties
  const specialties = [
    "General Dentist",
    "Orthodontist",
    "Endodontist",
    "Periodontist",
    "Prosthodontist",
    "Oral Surgeon",
    "Pediatric Dentist",
    "Dental Hygienist",
    "Dental Assistant",
    "Dental Lab Technician",
  ];

  // List of deal preferences
  const dealPreferences = [
    "Dental Materials",
    "Equipment",
    "Software",
    "Continuing Education",
    "Practice Management",
    "Patient Care Products",
    "Lab Services",
    "Supplies",
    "Orthodontic Products",
  ];

  // List of countries
  const countries = [
    "USA", "Canada", "UK", "Australia", "Germany", 
    "France", "Spain", "Italy", "Japan", "Brazil",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-lg">
        {/* Progress indicator */}
        <div className="flex w-full bg-muted h-1">
          <div 
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">
            {step === 1 && "Welcome to DentalDeals!"}
            {step === 2 && "Tell us about your practice"}
            {step === 3 && "Almost done!"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {step === 1 && "Let's set up your profile to personalize your experience."}
            {step === 2 && "Help us understand your specialty to show relevant deals."}
            {step === 3 && "Select your deal preferences to curate the perfect collection."}
          </p>

          <div className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => updateUserData("name", e.target.value)}
                    placeholder="Dr. Jane Smith"
                    className="rounded-md"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={userData.country}
                    onValueChange={(value) => updateUserData("country", value)}
                  >
                    <SelectTrigger className="rounded-md">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="practiceName">Practice Name (Optional)</Label>
                  <Input
                    id="practiceName"
                    value={userData.practiceName}
                    onChange={(e) => updateUserData("practiceName", e.target.value)}
                    placeholder="Smith Dental Clinic"
                    className="rounded-md"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Your Specialty</Label>
                  <RadioGroup
                    value={userData.specialty}
                    onValueChange={(value) => updateUserData("specialty", value)}
                    className="grid grid-cols-2 gap-2"
                  >
                    {specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <RadioGroupItem value={specialty} id={specialty} />
                        <Label htmlFor={specialty} className="cursor-pointer">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-3">
                  <Label>Deal Preferences (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {dealPreferences.map((preference) => (
                      <div key={preference} className="flex items-center space-x-2">
                        <Checkbox
                          id={preference}
                          checked={userData.preferences.includes(preference)}
                          onCheckedChange={() => togglePreference(preference)}
                        />
                        <Label htmlFor={preference} className="cursor-pointer">
                          {preference}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="marketingConsent"
                    checked={userData.marketingConsent}
                    onCheckedChange={(checked) =>
                      updateUserData("marketingConsent", checked === true)
                    }
                  />
                  <Label htmlFor="marketingConsent" className="text-sm">
                    I agree to receive emails about new deals and promotions.
                    You can unsubscribe at any time.
                  </Label>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div /> // Empty div to maintain spacing
            )}

            <Button 
              type="button" 
              variant={step === 3 ? "success" : "primary"} 
              onClick={handleNext}
              loading={loading && step === 3}
            >
              {step === 3 ? (
                <>
                  {!loading && <Check className="mr-2 h-4 w-4" />}
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
      </DialogContent>
    </Dialog>
  );
};
