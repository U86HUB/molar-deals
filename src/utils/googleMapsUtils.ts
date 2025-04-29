
// Utility functions for Google Maps integration

// Check if the Google Maps API is available
export const isGoogleMapsLoaded = (): boolean => {
  return typeof google !== 'undefined' && google.maps && google.maps.places;
};

// Load Google Maps script
export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
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

// Reverse geocode coordinates to address
export const reverseGeocode = (
  lat: number, 
  lng: number,
  callback: (result: google.maps.GeocoderResult | null, status: google.maps.GeocoderStatus) => void
): void => {
  if (isGoogleMapsLoaded()) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === 'OK' && results && results[0]) {
          callback(results[0], status);
        } else {
          callback(null, status);
        }
      }
    );
  }
};

// Extract address components from Google Places result
export const extractAddressComponents = (
  place: google.maps.places.PlaceResult
): {[key: string]: string} => {
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
  
  return addressComponents;
};
