
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocationStore } from "@/stores/locationStore";
import { toast } from "sonner";
import { extractAddressComponents } from "@/utils/googleMapsUtils";
import { Autocomplete } from '@react-google-maps/api';

interface GoogleAddressInputProps {
  googleLoaded: boolean;
}

export const GoogleAddressInput = ({ googleLoaded }: GoogleAddressInputProps) => {
  const { setLocation } = useLocationStore();
  const [inputValue, setInputValue] = useState('');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  
  const handlePlaceChange = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry && place.geometry.location) {
        // Extract address components
        const addressComponents = extractAddressComponents(place);
        
        // Update location store with both structured address AND coordinates
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
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="googleAddress">Verify Address</Label>
      {googleLoaded ? (
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChange}
          options={{
            types: ['address'],
            fields: ['address_components', 'formatted_address', 'geometry']
          }}
        >
          <Input
            id="googleAddress"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Start typing your address..."
            className="w-full"
          />
        </Autocomplete>
      ) : (
        <Input
          id="googleAddress"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Loading Google Maps..."
          className="w-full"
          disabled
        />
      )}
      <p className="text-xs text-muted-foreground">
        {googleLoaded 
          ? 'Start typing your address and select from the dropdown to verify'
          : 'Google Maps API is loading. Please wait...'}
      </p>
    </div>
  );
};
