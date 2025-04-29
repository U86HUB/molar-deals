
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LocationSource } from "@/stores/locationStore";
import { cn } from "@/lib/utils";

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
          if (value && value === 'google') {
            setAddressMode(value as LocationSource);
          }
        }}
        className="justify-start"
      >
        <ToggleGroupItem 
          value="google" 
          disabled={!googleMapsAvailable}
          className={cn(
            "px-4 py-2 rounded-full",
            addressMode === 'google' ? 
              "bg-primary/15 text-primary border-primary" : 
              "border border-gray-300 text-gray-600"
          )}
        >
          Verify via Google
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
