
import { useState, useEffect } from 'react';
import { useLocationStore, LocationSource } from "@/stores/locationStore";
import { AddressModeSelector } from './AddressModeSelector';
import { GoogleAddressInput } from './GoogleAddressInput';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJsApiLoader } from '@react-google-maps/api';

interface AddressSelectorProps {
  googleMapsApiKey: string;
}

export const AddressSelector = ({ googleMapsApiKey }: AddressSelectorProps) => {
  const { addressStructured, setAddressComponent, source, setLocation, isVerified, setVerified } = useLocationStore();
  const [addressMode, setAddressMode] = useState<LocationSource>(source || 'google');
  
  // Use the @react-google-maps/api loader for better reliability
  const { isLoaded: googleLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"]
  });

  const handleAddressModeChange = (mode: LocationSource) => {
    setAddressMode(mode);
    setLocation({ source: mode });
    
    // When switching to manual mode, enable editing fields
    if (mode === 'manual') {
      setVerified(true);
    }
  };

  const isGoogleMapsAvailable = googleLoaded && Boolean(googleMapsApiKey);
  const fieldsDisabled = addressMode === 'google' && !isVerified;

  return (
    <div className="space-y-4">
      {/* Google Autocomplete Input - Always visible */}
      {isGoogleMapsAvailable && !loadError && (
        <div className="space-y-2">
          <Label htmlFor="googleAddress" className="font-medium">Verify Address</Label>
          <GoogleAddressInput 
            googleLoaded={googleLoaded} 
            onVerification={() => setVerified(true)}
          />
          <p className="text-xs text-muted-foreground">
            Start typing your address and select from the dropdown to fill in the details below.
          </p>
        </div>
      )}
      
      {loadError && (
        <div className="py-2 text-center text-red-500 rounded bg-red-50">
          Failed to load Google Maps. Please use manual address entry.
        </div>
      )}
      
      {/* Address Mode Toggle */}
      <div className="flex items-center justify-end mb-2">
        <AddressModeSelector 
          addressMode={addressMode}
          setAddressMode={handleAddressModeChange}
          googleMapsAvailable={isGoogleMapsAvailable}
        />
      </div>
      
      {/* Structured Address Fields - Always visible */}
      <div className="space-y-4 pt-2 border border-gray-100 bg-gray-50 rounded-md p-4">
        <div className="space-y-2">
          <Label htmlFor="streetAddress" className="text-sm">Street Address</Label>
          <Input
            id="streetAddress"
            value={addressStructured?.streetAddress || ''}
            onChange={(e) => setAddressComponent('streetAddress', e.target.value)}
            placeholder="Street Address"
            disabled={fieldsDisabled}
            className={fieldsDisabled ? "bg-gray-100" : ""}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm">City</Label>
            <Input
              id="city"
              value={addressStructured?.city || ''}
              onChange={(e) => setAddressComponent('city', e.target.value)}
              placeholder="City"
              disabled={fieldsDisabled}
              className={fieldsDisabled ? "bg-gray-100" : ""}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm">State / Province</Label>
            <Input
              id="state"
              value={addressStructured?.state || ''}
              onChange={(e) => setAddressComponent('state', e.target.value)}
              placeholder="State / Province"
              disabled={fieldsDisabled}
              className={fieldsDisabled ? "bg-gray-100" : ""}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-sm">Postal / ZIP Code</Label>
            <Input
              id="postalCode"
              value={addressStructured?.postalCode || ''}
              onChange={(e) => setAddressComponent('postalCode', e.target.value)}
              placeholder="Postal / ZIP Code"
              disabled={fieldsDisabled}
              className={fieldsDisabled ? "bg-gray-100" : ""}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm">Country</Label>
            <Input
              id="country"
              value={addressStructured?.country || ''}
              onChange={(e) => setAddressComponent('country', e.target.value)}
              placeholder="Country"
              disabled={fieldsDisabled}
              className={fieldsDisabled ? "bg-gray-100" : ""}
            />
          </div>
        </div>
        
        {fieldsDisabled && (
          <p className="text-xs text-muted-foreground italic">
            Verify via Google or switch to manual mode to edit these fields.
          </p>
        )}
      </div>
    </div>
  );
};
