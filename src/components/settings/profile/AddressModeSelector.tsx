
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LocationSource } from "@/stores/locationStore";

interface AddressModeSelectorProps {
  addressMode: LocationSource;
  setAddressMode: (mode: LocationSource) => void;
  googleMapsAvailable: boolean;
}

export const AddressModeSelector = ({ 
  addressMode, 
  setAddressMode,
  googleMapsAvailable
}: AddressModeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Address Entry Method</Label>
      <ToggleGroup 
        type="single" 
        value={addressMode} 
        onValueChange={(value: string) => {
          if (value && (value === 'manual' || value === 'google')) {
            setAddressMode(value as LocationSource);
          }
        }}
        className="justify-start"
      >
        <ToggleGroupItem value="google" disabled={!googleMapsAvailable}>
          Verify via Google
        </ToggleGroupItem>
        <ToggleGroupItem value="manual">
          Enter manually
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
