
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Check, MapPin, Bell, Building, User, Star, Briefcase, Globe, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

interface UserData {
  // Personal information
  name: string;
  email: string;
  phone: string;
  
  // Professional details
  practiceName: string;
  specialty: string;
  yearsOfExperience: string;
  practiceSize: string;
  
  // Location
  country: string;
  state: string;
  city: string;
  useGeolocation: boolean;
  
  // Preferences
  dealPreferences: string[];
  priceRangeMin: string;
  priceRangeMax: string;
  preferredBrands: string[];
  
  // Communication
  emailFrequency: string;
  notificationTypes: string[];
  marketingConsent: boolean;
}

const initialUserData: UserData = {
  name: "",
  email: "",
  phone: "",
  
  practiceName: "",
  specialty: "",
  yearsOfExperience: "0-5",
  practiceSize: "solo",
  
  country: "USA",
  state: "",
  city: "",
  useGeolocation: false,
  
  dealPreferences: [],
  priceRangeMin: "0",
  priceRangeMax: "5000",
  preferredBrands: [],
  
  emailFrequency: "weekly",
  notificationTypes: ["deals", "account"],
  marketingConsent: false,
};

export const OnboardingWizard = ({ isOpen, onComplete, onClose }: OnboardingWizardProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [loading, setLoading] = useState(false);
  const [geolocationStatus, setGeolocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle");
  const totalSteps = 6;

  // Load saved progress from localStorage if available
  useEffect(() => {
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
  }, [user]);

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("onboardingProgress", step.toString());
    localStorage.setItem("onboardingData", JSON.stringify(userData));
  }, [step, userData]);

  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDealPreference = (preference: string) => {
    if (userData.dealPreferences.includes(preference)) {
      updateUserData(
        "dealPreferences",
        userData.dealPreferences.filter((p) => p !== preference)
      );
    } else {
      updateUserData("dealPreferences", [...userData.dealPreferences, preference]);
    }
  };

  const toggleBrandPreference = (brand: string) => {
    if (userData.preferredBrands.includes(brand)) {
      updateUserData(
        "preferredBrands",
        userData.preferredBrands.filter((b) => b !== brand)
      );
    } else {
      updateUserData("preferredBrands", [...userData.preferredBrands, brand]);
    }
  };

  const toggleNotificationType = (type: string) => {
    if (userData.notificationTypes.includes(type)) {
      updateUserData(
        "notificationTypes",
        userData.notificationTypes.filter((t) => t !== type)
      );
    } else {
      updateUserData("notificationTypes", [...userData.notificationTypes, type]);
    }
  };

  const requestGeolocation = () => {
    setGeolocationStatus("requesting");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - we would normally use these coordinates to fetch location data
          // const { latitude, longitude } = position.coords;
          setGeolocationStatus("granted");
          updateUserData("useGeolocation", true);
          toast.success("Location access granted. You'll now see deals near you!");
        },
        (error) => {
          console.error("Geolocation error:", error);
          setGeolocationStatus("denied");
          updateUserData("useGeolocation", false);
          toast.error("Location access denied. You can still enter your location manually.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
      setGeolocationStatus("denied");
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (step) {
      case 1: // Personal Information
        if (!userData.name) {
          toast.error("Please enter your name");
          return false;
        }
        return true;
        
      case 2: // Professional Details
        if (!userData.specialty) {
          toast.error("Please select your specialty");
          return false;
        }
        return true;
        
      case 3: // Location
        if (!userData.country) {
          toast.error("Please select your country");
          return false;
        }
        return true;
        
      case 4: // Preferences
        if (userData.dealPreferences.length === 0) {
          toast.error("Please select at least one deal preference");
          return false;
        }
        return true;
        
      case 5: // Communication
        return true;
        
      case 6: // Review & Complete
        return true;
        
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
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

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Save user data to database if user is authenticated
      if (user?.id) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: userData.name,
            // Add other fields that match your profiles table schema
            // We'll store the complete onboarding data in user_metadata
          });
          
        if (error) {
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

  // Lists of options
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

  const popularBrands = [
    "3M",
    "Dentsply Sirona",
    "Henry Schein",
    "Colgate",
    "Oral-B",
    "Nobel Biocare",
    "Invisalign",
    "KaVo Kerr",
    "GC America",
    "Patterson Dental"
  ];

  const countries = [
    "USA", "Canada", "UK", "Australia", "Germany", 
    "France", "Spain", "Italy", "Japan", "Brazil",
  ];

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // Return appropriate step content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => updateUserData("name", e.target.value)}
                placeholder="Dr. Jane Smith"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => updateUserData("email", e.target.value)}
                placeholder="jane.smith@example.com"
                disabled={!!user?.email}
              />
              {user?.email && (
                <p className="text-xs text-muted-foreground">
                  Email address from your login information
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => updateUserData("phone", e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="practiceName">Practice Name</Label>
              <Input
                id="practiceName"
                value={userData.practiceName}
                onChange={(e) => updateUserData("practiceName", e.target.value)}
                placeholder="Smith Dental Clinic"
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
            
            <div className="space-y-3">
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Select
                value={userData.yearsOfExperience}
                onValueChange={(value) => updateUserData("yearsOfExperience", value)}
              >
                <SelectTrigger id="yearsExperience">
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5">0-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="11-20">11-20 years</SelectItem>
                  <SelectItem value="20+">20+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="practiceSize">Practice Size</Label>
              <Select
                value={userData.practiceSize}
                onValueChange={(value) => updateUserData("practiceSize", value)}
              >
                <SelectTrigger id="practiceSize">
                  <SelectValue placeholder="Select practice size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Practice</SelectItem>
                  <SelectItem value="small">Small Group (2-5 dentists)</SelectItem>
                  <SelectItem value="medium">Medium Group (6-20 dentists)</SelectItem>
                  <SelectItem value="large">Large Group / DSO (20+ dentists)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-secondary/50 p-4 rounded-lg mb-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Location Permissions</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Allow DentalDeals to access your location to show personalized deals near you.
                  </p>
                  
                  {geolocationStatus === "idle" && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={requestGeolocation}
                      className="flex items-center"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Share My Location
                    </Button>
                  )}
                  
                  {geolocationStatus === "requesting" && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="animate-pulse">Requesting location access...</span>
                    </div>
                  )}
                  
                  {geolocationStatus === "granted" && (
                    <div className="flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-2" />
                      Location access granted
                    </div>
                  )}
                  
                  {geolocationStatus === "denied" && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-amber-600">
                        Location access denied. You can still enter your location manually below.
                      </p>
                      <Button 
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={requestGeolocation} 
                        className="self-start"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="country">Country</Label>
              <Select
                value={userData.country}
                onValueChange={(value) => updateUserData("country", value)}
              >
                <SelectTrigger id="country">
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
            
            {userData.country === "USA" && (
              <div className="space-y-3">
                <Label htmlFor="state">State</Label>
                <Select
                  value={userData.state}
                  onValueChange={(value) => updateUserData("state", value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {usStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-3">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={userData.city}
                onChange={(e) => updateUserData("city", e.target.value)}
                placeholder="Your city"
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Deal Preferences (Select all that apply)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                These will help us show you the most relevant deals.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {dealPreferences.map((preference) => (
                  <div key={preference} className="flex items-center space-x-2">
                    <Checkbox
                      id={preference}
                      checked={userData.dealPreferences.includes(preference)}
                      onCheckedChange={() => toggleDealPreference(preference)}
                    />
                    <Label htmlFor={preference} className="cursor-pointer">
                      {preference}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Price Range (USD)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={userData.priceRangeMin}
                  onChange={(e) => updateUserData("priceRangeMin", e.target.value)}
                  placeholder="Min"
                  className="w-full"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  value={userData.priceRangeMax}
                  onChange={(e) => updateUserData("priceRangeMax", e.target.value)}
                  placeholder="Max"
                  className="w-full"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Leave at 0 to 5000 to see all price ranges
              </p>
            </div>
            
            <div className="space-y-3">
              <Label>Preferred Brands (Optional)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Select brands you're most interested in seeing deals from.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {popularBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={userData.preferredBrands.includes(brand)}
                      onCheckedChange={() => toggleBrandPreference(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="emailFrequency">Email Frequency</Label>
              <Select
                value={userData.emailFrequency}
                onValueChange={(value) => updateUserData("emailFrequency", value)}
              >
                <SelectTrigger id="emailFrequency">
                  <SelectValue placeholder="Select email frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Roundup</SelectItem>
                  <SelectItem value="important">Important Updates Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label>Notification Types</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Select which types of notifications you'd like to receive.
              </p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-deals" className="cursor-pointer">
                    New Deals & Offers
                  </Label>
                  <Switch
                    id="notif-deals"
                    checked={userData.notificationTypes.includes("deals")}
                    onCheckedChange={() => toggleNotificationType("deals")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-account" className="cursor-pointer">
                    Account Updates
                  </Label>
                  <Switch
                    id="notif-account"
                    checked={userData.notificationTypes.includes("account")}
                    onCheckedChange={() => toggleNotificationType("account")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-events" className="cursor-pointer">
                    Educational Events & Webinars
                  </Label>
                  <Switch
                    id="notif-events"
                    checked={userData.notificationTypes.includes("events")}
                    onCheckedChange={() => toggleNotificationType("events")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-community" className="cursor-pointer">
                    Community Updates
                  </Label>
                  <Switch
                    id="notif-community"
                    checked={userData.notificationTypes.includes("community")}
                    onCheckedChange={() => toggleNotificationType("community")}
                  />
                </div>
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
          </div>
        );
        
      case 6:
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
                Location
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p>{userData.country}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p>{userData.city || "Not specified"}</p>
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
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-lg max-h-[90vh] overflow-y-auto">
        {/* Progress indicator */}
        <div className="px-6 pt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress 
            value={(step / totalSteps) * 100} 
            className="h-2"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">
            {step === 1 && "Welcome to DentalDeals!"}
            {step === 2 && "Professional Details"}
            {step === 3 && "Your Location"}
            {step === 4 && "Deal Preferences"}
            {step === 5 && "Communication Preferences"}
            {step === 6 && "Review Your Information"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {step === 1 && "Let's start by getting to know you better."}
            {step === 2 && "Tell us about your dental practice."}
            {step === 3 && "Help us show deals near you."}
            {step === 4 && "Select your preferences to see relevant deals."}
            {step === 5 && "Choose how you'd like to hear from us."}
            {step === 6 && "Please review your information before completing."}
          </p>

          <div className="space-y-6">
            {renderStepContent()}
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

            <div className="flex gap-2">
              {/* Skip button for optional steps */}
              {(step === 3 && !userData.useGeolocation) || step === 4 || step === 5 ? (
                <Button type="button" variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
              ) : null}
              
              <Button 
                type="button" 
                variant={step === totalSteps ? "success" : "primary"} 
                onClick={handleNext}
                loading={loading && step === totalSteps}
              >
                {step === totalSteps ? (
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
