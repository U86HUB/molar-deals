
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import { StepProps } from "../types";
import { countries, usStates } from "../data/onboardingOptions";

export const LocationStep = ({ userData, updateUserData }: StepProps) => {
  const [geolocationStatus, setGeolocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">(
    userData.useGeolocation ? "granted" : "idle"
  );

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
};
