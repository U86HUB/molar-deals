
import { useState, useEffect, useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocationStore, LocationSource } from "@/stores/locationStore";
import { toast } from "sonner";

// Check if the Google Maps API is available
const isGoogleMapsLoaded = () => {
  return typeof google !== 'undefined' && google.maps && google.maps.places;
};

// Load Google Maps script
const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsLoaded()) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps API'));
    document.head.appendChild(script);
  });
};

interface AddressSelectorProps {
  googleMapsApiKey: string;
}

export const AddressSelector = ({ googleMapsApiKey }: AddressSelectorProps) => {
  const { addressStructured, coords, source, setLocation, setAddressComponent } = useLocationStore();
  const [addressMode, setAddressMode] = useState<LocationSource>(source || 'manual');
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [googleInputValue, setGoogleInputValue] = useState('');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  // Load Google Maps API
  useEffect(() => {
    if (googleMapsApiKey) {
      loadGoogleMapsScript(googleMapsApiKey)
        .then(() => setGoogleLoaded(true))
        .catch((error) => {
          console.error('Error loading Google Maps:', error);
          // Fallback to manual mode if Google Maps fails to load
          setAddressMode('manual');
        });
    } else {
      // No API key, fallback to manual mode
      setAddressMode('manual');
    }
  }, [googleMapsApiKey]);
  
  // Initialize Google Autocomplete
  useEffect(() => {
    if (googleLoaded && inputRef.current && addressMode === 'google') {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        fields: ['address_components', 'formatted_address', 'geometry'],
      });
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          // Extract address components
          const addressComponents: {[key: string]: string} = {};
          place.address_components?.forEach((component) => {
            const componentType = component.types[0];
            switch (componentType) {
              case 'street_number':
                addressComponents.streetNumber = component.long_name;
                break;
              case 'route':
                addressComponents.street = component.long_name;
                break;
              case 'locality':
                addressComponents.city = component.long_name;
                break;
              case 'administrative_area_level_1':
                addressComponents.state = component.short_name;
                break;
              case 'postal_code':
                addressComponents.postalCode = component.long_name;
                break;
              case 'country':
                addressComponents.country = component.short_name;
                break;
            }
          });
          
          // Format street address
          const streetAddress = [
            addressComponents.streetNumber, 
            addressComponents.street
          ].filter(Boolean).join(' ');
          
          // Update location store
          setLocation({
            addressStructured: {
              streetAddress,
              city: addressComponents.city,
              state: addressComponents.state,
              postalCode: addressComponents.postalCode,
              country: addressComponents.country,
            },
            coords: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            source: 'google',
          });
          
          // Set the full address in the input
          setGoogleInputValue(place.formatted_address || '');
          
          toast.success('Address verified successfully');
        }
      });
      
      autocompleteRef.current = autocomplete;
    }
  }, [googleLoaded, addressMode, setLocation]);

  // Handle geolocation request
  const handleGeolocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, lng } = position.coords;
          setLocation({
            coords: { lat: latitude, lng },
            source: 'geolocation',
          });
          
          // If Google Maps is loaded, we can reverse geocode
          if (googleLoaded && google.maps) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              { location: { lat: latitude, lng } },
              (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  // Process the results similar to autocomplete
                  const place = results[0];
                  
                  // Extract and update address components...
                  // (Similar to the code in the autocomplete place_changed handler)
                  
                  setGoogleInputValue(place.formatted_address || '');
                  toast.success('Location detected successfully');
                } else {
                  toast.error('Could not detect address from your location');
                }
              }
            );
          } else {
            toast.success('Location coordinates detected');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast.error('Could not access your location. Please enable location services.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleGeolocationRequest}
          className="flex items-center"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Use My Current Location
        </Button>
        
        <span className="text-sm text-muted-foreground sm:ml-2">or</span>
      </div>
      
      <div className="space-y-2">
        <Label>Address Entry Method</Label>
        <ToggleGroup 
          type="single" 
          value={addressMode} 
          onValueChange={(value: string) => {
            if (value && (value === 'manual' || value === 'google')) {
              setAddressMode(value as LocationSource);
              setLocation({ source: value as LocationSource });
            }
          }}
          className="justify-start"
        >
          <ToggleGroupItem value="google" disabled={!googleMapsApiKey || !googleLoaded}>
            Verify via Google
          </ToggleGroupItem>
          <ToggleGroupItem value="manual">
            Enter manually
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {addressMode === 'google' && googleLoaded ? (
        <div className="space-y-2">
          <Label htmlFor="googleAddress">Verify Address</Label>
          <Input
            id="googleAddress"
            ref={inputRef}
            value={googleInputValue}
            onChange={(e) => setGoogleInputValue(e.target.value)}
            placeholder="Start typing your address..."
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Start typing your address and select from the dropdown to verify
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input
              id="streetAddress"
              value={addressStructured?.streetAddress || ''}
              onChange={(e) => setAddressComponent('streetAddress', e.target.value)}
              placeholder="Street Address"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={addressStructured?.city || ''}
                onChange={(e) => setAddressComponent('city', e.target.value)}
                placeholder="City"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                value={addressStructured?.state || ''}
                onChange={(e) => setAddressComponent('state', e.target.value)}
                placeholder="State / Province"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal / ZIP Code</Label>
              <Input
                id="postalCode"
                value={addressStructured?.postalCode || ''}
                onChange={(e) => setAddressComponent('postalCode', e.target.value)}
                placeholder="Postal / ZIP Code"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={addressStructured?.country || ''}
                onChange={(e) => setAddressComponent('country', e.target.value)}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
