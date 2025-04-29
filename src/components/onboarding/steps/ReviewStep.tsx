
import { Button } from "@/components/ui/button";
import { User, Briefcase, MapPin, Star, Bell } from "lucide-react";
import { StepProps } from "../types";

interface ReviewStepProps extends StepProps {
  setStep: (step: number) => void;
}

export const ReviewStep = ({ userData, updateUserData, setStep }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-secondary/50 p-4 rounded-lg mb-2">
        <h4 className="font-medium mb-4 flex items-center">
          <User className="h-5 w-5 mr-2 text-primary" />
          Personal Information
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{userData.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{userData.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2" 
          onClick={() => setStep(1)}
        >
          Edit
        </Button>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mb-2">
        <h4 className="font-medium mb-4 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          Professional Details
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Practice</p>
            <p>{userData.practiceName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Specialty</p>
            <p>{userData.specialty}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2" 
          onClick={() => setStep(2)}
        >
          Edit
        </Button>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mb-2">
        <h4 className="font-medium mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Location & Address
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Country</p>
            <p>{userData.country}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">State</p>
            <p>{userData.state || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">City</p>
            <p>{userData.city || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Street Address</p>
            <p>{userData.streetAddress || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Postal Code</p>
            <p>{userData.postalCode || "Not specified"}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2" 
          onClick={() => setStep(3)}
        >
          Edit
        </Button>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mb-2">
        <h4 className="font-medium mb-4 flex items-center">
          <Star className="h-5 w-5 mr-2 text-primary" />
          Preferences
        </h4>
        <div>
          <p className="text-sm text-muted-foreground">Deal Categories</p>
          <p>{userData.dealPreferences.join(", ") || "None selected"}</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2" 
          onClick={() => setStep(4)}
        >
          Edit
        </Button>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg mb-2">
        <h4 className="font-medium mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary" />
          Communication
        </h4>
        <div>
          <p className="text-sm text-muted-foreground">Email Frequency</p>
          <p>
            {userData.emailFrequency === "daily" && "Daily Digest"}
            {userData.emailFrequency === "weekly" && "Weekly Summary"}
            {userData.emailFrequency === "monthly" && "Monthly Roundup"}
            {userData.emailFrequency === "important" && "Important Updates Only"}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2" 
          onClick={() => setStep(5)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
