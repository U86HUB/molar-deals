
// Utility functions for Google Maps integration

// Check if the Google Maps API is available
export const isGoogleMapsLoaded = (): boolean => {
  return typeof google !== 'undefined' && google.maps && typeof google.maps.places !== 'undefined';
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
  lng: number
): Promise<google.maps.GeocoderResult | null> => {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsLoaded()) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === 'OK' && results && results[0]) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed with status: ${status}`));
          }
        }
      );
    } else {
      reject(new Error('Google Maps not loaded'));
    }
  });
};

// Extract address components from Google Places result or Geocoder result
export const extractAddressComponents = (
  place: google.maps.places.PlaceResult | google.maps.GeocoderResult
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

  // Combine street number and street name if both exist
  if (addressComponents.streetNumber && addressComponents.street) {
    addressComponents.streetAddress = `${addressComponents.streetNumber} ${addressComponents.street}`;
  } else if (addressComponents.street) {
    addressComponents.streetAddress = addressComponents.street;
  }
  
  return addressComponents;
};

// Get formatted address from place details
export const getFormattedAddress = (
  place: google.maps.places.PlaceResult | google.maps.GeocoderResult
): string => {
  return place.formatted_address || '';
};

// Initialize Google Places Autocomplete
export const initPlacesAutocomplete = (
  inputElement: HTMLInputElement,
  options: google.maps.places.AutocompleteOptions = {},
  callback?: (place: google.maps.places.PlaceResult) => void
): google.maps.places.Autocomplete | null => {
  if (!isGoogleMapsLoaded() || !inputElement) return null;
  
  const defaultOptions: google.maps.places.AutocompleteOptions = {
    types: ['address'],
    fields: ['address_components', 'formatted_address', 'geometry']
  };

  const autocomplete = new google.maps.places.Autocomplete(
    inputElement, 
    { ...defaultOptions, ...options }
  );
  
  if (callback) {
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        callback(place);
      }
    });
  }
  
  return autocomplete;
};
