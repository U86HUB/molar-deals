
import { useState, useEffect } from 'react';
import { useLocationStore, LocationSource } from "@/stores/locationStore";
import { GeolocationButton } from './GeolocationButton';
import { AddressModeSelector } from './AddressModeSelector';
import { GoogleAddressInput } from './GoogleAddressInput';
import { ManualAddressForm } from './ManualAddressForm';
import { loadGoogleMapsScript, isGoogleMapsLoaded } from '@/utils/googleMapsUtils';

interface AddressSelectorProps {
  googleMapsApiKey: string;
}

export const AddressSelector = ({ googleMapsApiKey }: AddressSelectorProps) => {
  const { source, setLocation } = useLocationStore();
  const [addressMode, setAddressMode] = useState<LocationSource>(source || 'manual');
  const [googleLoaded, setGoogleLoaded] = useState(false);
  
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

  const handleAddressModeChange = (mode: LocationSource) => {
    setAddressMode(mode);
    setLocation({ source: mode });
  };

  const isGoogleMapsAvailable = googleLoaded && Boolean(googleMapsApiKey);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
        <GeolocationButton googleLoaded={googleLoaded} />
        
        <span className="text-sm text-muted-foreground sm:ml-2">or</span>
      </div>
      
      <AddressModeSelector 
        addressMode={addressMode}
        setAddressMode={handleAddressModeChange}
        googleMapsAvailable={isGoogleMapsAvailable}
      />
      
      {addressMode === 'google' && isGoogleMapsAvailable ? (
        <GoogleAddressInput googleLoaded={googleLoaded} />
      ) : (
        <ManualAddressForm />
      )}
    </div>
  );
};
