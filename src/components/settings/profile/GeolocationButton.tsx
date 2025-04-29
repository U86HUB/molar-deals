
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLocationStore } from "@/stores/locationStore";
import { reverseGeocode } from "@/utils/googleMapsUtils";
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
          setLocation({
            coords: { lat: latitude, lng: longitude },
            source: 'geolocation',
          });
          
          // If Google Maps is loaded, we can reverse geocode
          if (googleLoaded && google.maps) {
            reverseGeocode(latitude, longitude, (place, status) => {
              if (status === 'OK' && place) {
                setLocation({
                  addressStructured: {
                    // You would extract address components here
                    // similar to the autocomplete handler
                  },
                });
                toast.success('Location detected successfully');
              } else {
                toast.error('Could not detect address from your location');
              }
            });
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
