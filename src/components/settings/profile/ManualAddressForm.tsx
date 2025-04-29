
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocationStore } from "@/stores/locationStore";

export const ManualAddressForm = () => {
  const { addressStructured, setAddressComponent } = useLocationStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="streetAddress">Street Address</Label>
        <Input
          id="streetAddress"
          value={addressStructured?.streetAddress || ''}
          onChange={(e) => setAddressComponent('streetAddress', e.target.value)}
          placeholder="Street Address"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={addressStructured?.city || ''}
            onChange={(e) => setAddressComponent('city', e.target.value)}
            placeholder="City"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State / Province</Label>
          <Input
            id="state"
            value={addressStructured?.state || ''}
            onChange={(e) => setAddressComponent('state', e.target.value)}
            placeholder="State / Province"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal / ZIP Code</Label>
          <Input
            id="postalCode"
            value={addressStructured?.postalCode || ''}
            onChange={(e) => setAddressComponent('postalCode', e.target.value)}
            placeholder="Postal / ZIP Code"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={addressStructured?.country || ''}
            onChange={(e) => setAddressComponent('country', e.target.value)}
            placeholder="Country"
          />
        </div>
      </div>
    </div>
  );
};
