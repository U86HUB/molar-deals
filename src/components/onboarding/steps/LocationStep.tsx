
import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { StepProps } from "../types";
import { LocationSelector, LocationData } from "@/components/shared/LocationSelector";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Get Google Places API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

type AddressMode = "auto" | "manual";

export const LocationStep = ({ userData, updateUserData }: StepProps) => {
  const [geolocationStatus, setGeolocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">(
    userData.useGeolocation ? "granted" : "idle"
  );
  const [addressMode, setAddressMode] = useState<AddressMode>("manual");
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  
  // Load Google Maps Places API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const requestGeolocation = () => {
    setGeolocationStatus("requesting");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - we would normally use these coordinates to fetch location data
          // const { latitude, longitude } = position.coords;
          setGeolocationStatus("granted");
          updateUserData("useGeolocation", true);
          toast({
            title: "Location access granted",
            description: "You'll now see deals near you!"
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setGeolocationStatus("denied");
          updateUserData("useGeolocation", false);
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

  // Convert from userData format to LocationSelector format
  const locationData: LocationData = {
    locationType: "country",
    countryCode: userData.country,
    state: userData.state,
    city: userData.city,
    streetAddress: userData.streetAddress,
    postalCode: userData.postalCode
  };

  const handleLocationChange = (location: LocationData) => {
    if (location.locationType === "global") {
      updateUserData("country", "GLOBAL");
      updateUserData("state", "");
      updateUserData("city", "");
      updateUserData("streetAddress", "");
      updateUserData("postalCode", "");
    } else if (location.locationType === "country" && location.countryCode) {
      updateUserData("country", location.countryCode);
      updateUserData("state", location.state || "");
      updateUserData("city", location.city || "");
      updateUserData("streetAddress", location.streetAddress || "");
      updateUserData("postalCode", location.postalCode || "");
    }
  };
  
  const handlePlaceChange = () => {
    const place = autocompleteRef.current?.getPlace();
    
    if (place?.formatted_address) {
      setAddress(place.formatted_address);
      
      // Extract address components
      let streetNumber = '';
      let street = '';
      let city = '';
      let state = '';
      let country = '';
      let postalCode = '';
      
      // Parse address components
      if (place.address_components) {
        for (const component of place.address_components) {
          const componentType = component.types[0];
          
          switch (componentType) {
            case 'street_number':
              streetNumber = component.long_name;
              break;
            case 'route':
              street = component.long_name;
              break;
            case 'locality':
              city = component.long_name;
              break;
            case 'administrative_area_level_1':
              state = component.short_name;
              break;
            case 'country':
              country = component.short_name;
              break;
            case 'postal_code':
              postalCode = component.long_name;
              break;
          }
        }
      }
      
      // Update user data with extracted components
      updateUserData("streetAddress", `${streetNumber} ${street}`.trim());
      updateUserData("city", city);
      updateUserData("state", state);
      updateUserData("country", country);
      updateUserData("postalCode", postalCode);
      
      toast({
        title: "Address verified",
        description: "Your address has been successfully verified."
      });
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
      
      <div className="space-y-4">
        <h4 className="font-medium">Clinic Location & Address</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Please provide your clinic's location and address information
        </p>
        
        <div className="mb-6">
          <Label htmlFor="address-mode" className="mb-2 block">Address Entry Method</Label>
          <ToggleGroup 
            type="single" 
            value={addressMode} 
            onValueChange={(value: string) => {
              if (value && (value === "auto" || value === "manual")) {
                setAddressMode(value as AddressMode);
              }
            }}
            className="justify-start"
          >
            <ToggleGroupItem value="auto" disabled={!isLoaded || !!loadError}>
              Verify via Google
            </ToggleGroupItem>
            <ToggleGroupItem value="manual">
              Enter manually
            </ToggleGroupItem>
          </ToggleGroup>
          
          {!isLoaded && addressMode === "auto" && (
            <p className="text-sm text-muted-foreground mt-2">Loading address verification...</p>
          )}
          
          {loadError && (
            <p className="text-sm text-destructive mt-2">
              Error loading address verification. Please use manual entry.
            </p>
          )}
          
          {!GOOGLE_MAPS_API_KEY && addressMode === "auto" && (
            <p className="text-sm text-amber-600 mt-2">
              Google Maps API key not configured. Please use manual entry.
            </p>
          )}
        </div>
        
        {addressMode === "auto" && isLoaded && GOOGLE_MAPS_API_KEY && (
          <div className="mb-6 space-y-2">
            <Label htmlFor="google-address">Verify Address</Label>
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handlePlaceChange}
              options={{
                componentRestrictions: { country: ["us", "ca"] },
                fields: ["address_components", "formatted_address", "geometry"],
                types: ["address"]
              }}
            >
              <Input
                id="google-address"
                placeholder="Start typing your clinic address..."
                className="w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Autocomplete>
            <p className="text-xs text-muted-foreground">
              Start typing your address and select from the dropdown to verify
            </p>
          </div>
        )}
        
        {(addressMode === "manual" || !isLoaded || !GOOGLE_MAPS_API_KEY) && (
          <LocationSelector 
            value={locationData} 
            onChange={handleLocationChange}
            allowGlobal={false}
            allowRegion={false}
            showAddress={true}
          />
        )}
      </div>
    </div>
  );
};
