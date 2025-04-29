
import { useState } from "react";
import { MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface GeolocationSectionProps {
  initialStatus: "idle" | "requesting" | "granted" | "denied";
  onGeolocationChange: (useGeolocation: boolean) => void;
}

export const GeolocationSection = ({
  initialStatus,
  onGeolocationChange,
}: GeolocationSectionProps) => {
  const [geolocationStatus, setGeolocationStatus] = useState<
    "idle" | "requesting" | "granted" | "denied"
  >(initialStatus);

  const requestGeolocation = () => {
    setGeolocationStatus("requesting");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - we would normally use these coordinates to fetch location data
          // const { latitude, longitude } = position.coords;
          setGeolocationStatus("granted");
          onGeolocationChange(true);
          toast({
            title: "Location access granted",
            description: "You'll now see deals near you!"
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setGeolocationStatus("denied");
          onGeolocationChange(false);
          toast({
            title: "Location access denied",
            description: "You can still enter your location manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
      setGeolocationStatus("denied");
    }
  };

  return (
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
  );
};
