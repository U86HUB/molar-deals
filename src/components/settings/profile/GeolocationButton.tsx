
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLocationStore } from "@/stores/locationStore";
import { reverseGeocode, extractAddressComponents } from "@/utils/googleMapsUtils";
import { toast } from "sonner";

interface GeolocationButtonProps {
  googleLoaded: boolean;
}

export const GeolocationButton = ({ googleLoaded }: GeolocationButtonProps) => {
  const { setLocation } = useLocationStore();
  
  const handleGeolocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // First update with coordinates
          setLocation({
            coords: { lat: latitude, lng: longitude },
            source: 'geolocation',
          });
          
          // If Google Maps is loaded, we can reverse geocode
          if (googleLoaded) {
            reverseGeocode(latitude, longitude, (place, status) => {
              if (status === 'OK' && place) {
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
              } else {
                toast.error(`Could not detect address from your location: ${status}`);
              }
            });
          } else {
            toast.success('Location coordinates detected');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
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
    }
  };

  return (
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
  );
};
