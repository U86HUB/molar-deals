
import { useState, useEffect } from 'react';
import { useLocationStore, LocationSource } from "@/stores/locationStore";
import { AddressModeSelector } from './AddressModeSelector';
import { GoogleAddressInput } from './GoogleAddressInput';
import { ManualAddressForm } from './ManualAddressForm';
import { loadGoogleMapsScript, isGoogleMapsLoaded } from '@/utils/googleMapsUtils';
import { Card, CardContent } from "@/components/ui/card";
import { useJsApiLoader } from '@react-google-maps/api';

interface AddressSelectorProps {
  googleMapsApiKey: string;
}

export const AddressSelector = ({ googleMapsApiKey }: AddressSelectorProps) => {
  const { source, setLocation } = useLocationStore();
  const [addressMode, setAddressMode] = useState<LocationSource>(source || 'google');
  
  // Use the @react-google-maps/api loader for better reliability
  const { isLoaded: googleLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"]
  });

  const handleAddressModeChange = (mode: LocationSource) => {
    setAddressMode(mode);
    setLocation({ source: mode });
  };

  const isGoogleMapsAvailable = googleLoaded && Boolean(googleMapsApiKey);

  if (loadError) {
    console.error("Error loading Google Maps API:", loadError);
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-end mb-4">
          <AddressModeSelector 
            addressMode={addressMode}
            setAddressMode={handleAddressModeChange}
            googleMapsAvailable={isGoogleMapsAvailable}
          />
        </div>
        
        {loadError && (
          <div className="py-4 text-center text-red-500">
            Failed to load Google Maps. Please try the manual address entry method.
          </div>
        )}
        
        {addressMode === 'google' && isGoogleMapsAvailable && !loadError ? (
          <GoogleAddressInput googleLoaded={googleLoaded} />
        ) : (
          <ManualAddressForm />
        )}
      </CardContent>
    </Card>
  );
};
