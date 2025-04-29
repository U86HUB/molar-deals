
import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface GoogleAddressFormProps {
  onAddressChange: (addressComponents: {
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) => void;
}

export const GoogleAddressForm = ({ onAddressChange }: GoogleAddressFormProps) => {
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  
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
      
      // Update parent component with extracted components
      onAddressChange({
        streetAddress: `${streetNumber} ${street}`.trim(),
        city,
        state,
        country,
        postalCode
      });
      
      toast({
        title: "Address verified",
        description: "Your address has been successfully verified."
      });
    }
  };

  return (
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
  );
};
