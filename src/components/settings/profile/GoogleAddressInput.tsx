
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocationStore } from "@/stores/locationStore";
import { toast } from "sonner";
import { isGoogleMapsLoaded, extractAddressComponents, initPlacesAutocomplete } from "@/utils/googleMapsUtils";

interface GoogleAddressInputProps {
  googleLoaded: boolean;
}

export const GoogleAddressInput = ({ googleLoaded }: GoogleAddressInputProps) => {
  const { setLocation } = useLocationStore();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  // Initialize Google Autocomplete
  useEffect(() => {
    if (googleLoaded && inputRef.current) {
      const autocomplete = initPlacesAutocomplete(
        inputRef.current, 
        {
          types: ['address'],
          fields: ['address_components', 'formatted_address', 'geometry']
        },
        (place) => {
          if (place.geometry && place.geometry.location) {
            // Extract address components
            const addressComponents = extractAddressComponents(place);
            
            // Update location store
            setLocation({
              addressStructured: {
                streetAddress: addressComponents.streetAddress || '',
                city: addressComponents.city || '',
                state: addressComponents.state || '',
                postalCode: addressComponents.postalCode || '',
                country: addressComponents.country || '',
              },
              coords: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
              source: 'google',
            });
            
            // Set the full address in the input
            setInputValue(place.formatted_address || '');
            
            toast.success('Address verified successfully');
          }
        }
      );
      
      // Return cleanup function
      return () => {
        // Clean up if needed
      };
    }
  }, [googleLoaded, setLocation]);

  return (
    <div className="space-y-2">
      <Label htmlFor="googleAddress">Verify Address</Label>
      <Input
        id="googleAddress"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Start typing your address..."
        className="w-full"
      />
      <p className="text-xs text-muted-foreground">
        {googleLoaded 
          ? 'Start typing your address and select from the dropdown to verify'
          : 'Google Maps API is not loaded. Please check your API key.'}
      </p>
    </div>
  );
};
