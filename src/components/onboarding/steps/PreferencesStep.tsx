
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { StepProps } from "../types";
import { dealPreferences, popularBrands } from "../data/onboardingOptions";

export const PreferencesStep = ({ userData, updateUserData }: StepProps) => {
  const toggleDealPreference = (preference: string) => {
    if (userData.dealPreferences.includes(preference)) {
      updateUserData(
        "dealPreferences",
        userData.dealPreferences.filter((p) => p !== preference)
      );
    } else {
      updateUserData("dealPreferences", [...userData.dealPreferences, preference]);
    }
  };

  const toggleBrandPreference = (brand: string) => {
    if (userData.preferredBrands.includes(brand)) {
      updateUserData(
        "preferredBrands",
        userData.preferredBrands.filter((b) => b !== brand)
      );
    } else {
      updateUserData("preferredBrands", [...userData.preferredBrands, brand]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Deal Preferences (Select all that apply)</Label>
        <p className="text-sm text-muted-foreground mb-2">
          These will help us show you the most relevant deals.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {dealPreferences.map((preference) => (
            <div key={preference} className="flex items-center space-x-2">
              <Checkbox
                id={preference}
                checked={userData.dealPreferences.includes(preference)}
                onCheckedChange={() => toggleDealPreference(preference)}
              />
              <Label htmlFor={preference} className="cursor-pointer">
                {preference}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Price Range (USD)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={userData.priceRangeMin}
            onChange={(e) => updateUserData("priceRangeMin", e.target.value)}
            placeholder="Min"
            className="w-full"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="number"
            value={userData.priceRangeMax}
            onChange={(e) => updateUserData("priceRangeMax", e.target.value)}
            placeholder="Max"
            className="w-full"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Leave at 0 to 5000 to see all price ranges
        </p>
      </div>
      
      <div className="space-y-3">
        <Label>Preferred Brands (Optional)</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Select brands you're most interested in seeing deals from.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {popularBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={userData.preferredBrands.includes(brand)}
                onCheckedChange={() => toggleBrandPreference(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
