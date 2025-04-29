
import { useState, useEffect } from 'react';
import { useLocationStore, LocationSource } from "@/stores/locationStore";
import { GeolocationButton } from './GeolocationButton';
import { AddressModeSelector } from './AddressModeSelector';
import { GoogleAddressInput } from './GoogleAddressInput';
import { ManualAddressForm } from './ManualAddressForm';
import { loadGoogleMapsScript, isGoogleMapsLoaded } from '@/utils/googleMapsUtils';
import { Card, CardContent } from "@/components/ui/card";

interface AddressSelectorProps {
  googleMapsApiKey: string;
}

export const AddressSelector = ({ googleMapsApiKey }: AddressSelectorProps) => {
  const { source, setLocation } = useLocationStore();
  const [addressMode, setAddressMode] = useState<LocationSource>(source || 'manual');
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = async () => {
      if (googleMapsApiKey) {
        setLoading(true);
        try {
          await loadGoogleMapsScript(googleMapsApiKey);
          setGoogleLoaded(true);
        } catch (error) {
          console.error('Error loading Google Maps:', error);
          // Fallback to manual mode if Google Maps fails to load
          setAddressMode('manual');
        } finally {
          setLoading(false);
        }
      } else {
        // No API key, fallback to manual mode
        setAddressMode('manual');
        setLoading(false);
      }
    };

    // Check if Google Maps is already loaded
    if (isGoogleMapsLoaded()) {
      setGoogleLoaded(true);
      setLoading(false);
    } else {
      loadGoogleMaps();
    }
  }, [googleMapsApiKey]);

  const handleAddressModeChange = (mode: LocationSource) => {
    setAddressMode(mode);
    setLocation({ source: mode });
  };

  const isGoogleMapsAvailable = googleLoaded && Boolean(googleMapsApiKey);

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <GeolocationButton googleLoaded={googleLoaded} />
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mx-2">or</span>
            <AddressModeSelector 
              addressMode={addressMode}
              setAddressMode={handleAddressModeChange}
              googleMapsAvailable={isGoogleMapsAvailable}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="py-4 text-center text-muted-foreground">
            Loading address options...
          </div>
        ) : (
          <>
            {addressMode === 'google' && isGoogleMapsAvailable ? (
              <GoogleAddressInput googleLoaded={googleLoaded} />
            ) : (
              <ManualAddressForm />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
