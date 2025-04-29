
import { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { LocationSelector, LocationData } from "@/components/shared/LocationSelector";

type AddressMode = "auto" | "manual";

interface LocationSectionProps {
  locationData: LocationData;
  onChange: (locationData: LocationData) => void;
  googleMapsApiKey: string;
}

export const LocationSection = ({ locationData, onChange, googleMapsApiKey }: LocationSectionProps) => {
  const [addressMode, setAddressMode] = useState<AddressMode>("manual");
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  
  // Load Google Maps Places API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries: ["places"],
  });
  
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
      
      // Update location data
      onChange({
        ...locationData,
        countryCode: country,
        state: state,
        city: city,
        streetAddress: `${streetNumber} ${street}`.trim(),
        postalCode: postalCode
      });
      
      toast.success("Address verified successfully!");
    }
  };

  // Initialize address string for display
  const setAddressString = () => {
    if (locationData.streetAddress && locationData.city) {
      const fullAddress = [
        locationData.streetAddress,
        locationData.city,
        locationData.state,
        locationData.countryCode,
        locationData.postalCode
      ].filter(Boolean).join(", ");
      
      setAddress(fullAddress);
    }
  };
  
  // Set address string when mode changes to Google verify
  useState(() => {
    if (addressMode === "auto") {
      setAddressString();
    }
  });

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Location & Address</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Enter the location and address of your practice
      </p>
      
      <div className="mb-4">
        <Label htmlFor="address-mode" className="mb-2 block">Address Entry Method</Label>
        <ToggleGroup 
          type="single" 
          value={addressMode} 
          onValueChange={(value: string) => {
            if (value && (value === "auto" || value === "manual")) {
              setAddressMode(value as AddressMode);
              if (value === "auto") {
                setAddressString();
              }
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
        
        {!googleMapsApiKey && addressMode === "auto" && (
          <p className="text-sm text-amber-600 mt-2">
            Google Maps API key not configured. Please use manual entry.
          </p>
        )}
      </div>
      
      {addressMode === "auto" && isLoaded && googleMapsApiKey && (
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
              placeholder="Start typing your practice address..."
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
      
      {(addressMode === "manual" || !isLoaded || !googleMapsApiKey) && (
        <LocationSelector 
          value={locationData}
          onChange={onChange}
          allowGlobal={false}
          allowRegion={false}
          showAddress={true}
        />
      )}
    </div>
  );
};
