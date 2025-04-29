
import { LocationSelector, LocationData } from "@/components/shared/LocationSelector";

interface ManualAddressFormProps {
  locationData: LocationData;
  onLocationChange: (location: LocationData) => void;
}

export const ManualAddressForm = ({ 
  locationData, 
  onLocationChange
}: ManualAddressFormProps) => {
  return (
    <LocationSelector 
      value={locationData} 
      onChange={onLocationChange}
      allowGlobal={false}
      allowRegion={false}
      showAddress={true}
    />
  );
};
