
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useJsApiLoader } from "@react-google-maps/api";
import { GoogleAddressForm } from "./GoogleAddressForm";
import { ManualAddressForm } from "./ManualAddressForm";
import { LocationData } from "@/components/shared/LocationSelector";

// Get Google Maps API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

type AddressMode = "auto" | "manual";

interface AddressEntrySectionProps {
  locationData: LocationData;
  onLocationChange: (location: LocationData) => void;
  onAddressComponentsChange: (components: {
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) => void;
}

export const AddressEntrySection = ({
  locationData,
  onLocationChange,
  onAddressComponentsChange
}: AddressEntrySectionProps) => {
  const [addressMode, setAddressMode] = useState<AddressMode>("manual");
  
  // Load Google Maps Places API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return (
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
        <GoogleAddressForm onAddressChange={onAddressComponentsChange} />
      )}
      
      {(addressMode === "manual" || !isLoaded || !GOOGLE_MAPS_API_KEY) && (
        <ManualAddressForm 
          locationData={locationData} 
          onLocationChange={onLocationChange} 
        />
      )}
    </div>
  );
};
