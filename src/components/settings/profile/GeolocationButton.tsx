
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLocationStore } from "@/stores/locationStore";
import { reverseGeocode, extractAddressComponents } from "@/utils/googleMapsUtils";
import { toast } from "sonner";
import { useState } from "react";

interface GeolocationButtonProps {
  googleLoaded: boolean;
}

export const GeolocationButton = ({ googleLoaded }: GeolocationButtonProps) => {
  const { setLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGeolocationRequest = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // First update with coordinates
          setLocation({
            coords: { lat: latitude, lng: longitude },
            source: 'geolocation',
          });
          
          // If Google Maps is loaded, we can reverse geocode
          if (googleLoaded) {
            try {
              const place = await reverseGeocode(latitude, longitude);
              if (place) {
                // Extract address components
                const addressComponents = extractAddressComponents(place);
                
                // Update location with structured address
                setLocation({
                  addressStructured: {
                    streetAddress: addressComponents.streetAddress || '',
                    city: addressComponents.city || '',
                    state: addressComponents.state || '',
                    postalCode: addressComponents.postalCode || '',
                    country: addressComponents.country || ''
                  },
                  source: 'geolocation'
                });
                
                toast.success('Location detected successfully');
              }
            } catch (error) {
              console.error('Reverse geocoding error:', error);
              toast.error(`Could not detect address from your location: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
              setIsLoading(false);
            }
          } else {
            toast.success('Location coordinates detected');
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLoading(false);
          
          let errorMessage = 'Could not access your location.';
          
          // Provide more specific error messages based on error code
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location services.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable. Please try again.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again.';
              break;
          }
          
          toast.error(errorMessage);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };

  return (
    <Button 
      type="button" 
      variant="outline" 
      size="sm" 
      onClick={handleGeolocationRequest}
      className="flex items-center"
      disabled={isLoading}
    >
      <MapPin className="h-4 w-4 mr-2" />
      {isLoading ? 'Detecting...' : 'Use My Current Location'}
    </Button>
  );
};
