
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { dealPreferences, popularBrands } from "@/components/onboarding/data/onboardingOptions";

export function PreferencesTab() {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    dealPreferences: [] as string[],
    priceRangeMin: "0",
    priceRangeMax: "5000",
    preferredBrands: [] as string[]
  });
  
  useEffect(() => {
    // Initialize from user metadata
    if (user) {
      setPreferences({
        dealPreferences: user.user_metadata?.preferences || [],
        priceRangeMin: user.user_metadata?.price_range_min || "0",
        priceRangeMax: user.user_metadata?.price_range_max || "5000",
        preferredBrands: user.user_metadata?.preferred_brands || []
      });
    }
  }, [user]);
  
  const toggleDealPreference = (preference: string) => {
    if (preferences.dealPreferences.includes(preference)) {
      setPreferences({
        ...preferences,
        dealPreferences: preferences.dealPreferences.filter(p => p !== preference)
      });
    } else {
      setPreferences({
        ...preferences,
        dealPreferences: [...preferences.dealPreferences, preference]
      });
    }
  };

  const toggleBrandPreference = (brand: string) => {
    if (preferences.preferredBrands.includes(brand)) {
      setPreferences({
        ...preferences,
        preferredBrands: preferences.preferredBrands.filter(b => b !== brand)
      });
    } else {
      setPreferences({
        ...preferences,
        preferredBrands: [...preferences.preferredBrands, brand]
      });
    }
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        preferences: preferences.dealPreferences,
        price_range_min: preferences.priceRangeMin,
        price_range_max: preferences.priceRangeMax,
        preferred_brands: preferences.preferredBrands
      });
      
      toast.success("Deal preferences saved successfully!");
    } catch (error) {
      console.error("Error saving deal preferences:", error);
      toast.error("Failed to save deal preferences");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Deal Preferences</h2>
        <p className="text-muted-foreground">
          Customize what types of deals and content you'd like to see
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Deal Categories</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select the categories of dental deals you're most interested in.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {dealPreferences.map((preference) => (
              <div key={preference} className="flex items-center space-x-2">
                <Checkbox
                  id={preference}
                  checked={preferences.dealPreferences.includes(preference)}
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
              value={preferences.priceRangeMin}
              onChange={(e) => setPreferences({...preferences, priceRangeMin: e.target.value})}
              placeholder="Min"
              className="w-full"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              value={preferences.priceRangeMax}
              onChange={(e) => setPreferences({...preferences, priceRangeMax: e.target.value})}
              placeholder="Max"
              className="w-full"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave at 0 to 5000 to see all price ranges
          </p>
        </div>
        
        <div className="space-y-3">
          <Label>Preferred Brands</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select brands you're most interested in seeing deals from.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {popularBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={preferences.preferredBrands.includes(brand)}
                  onCheckedChange={() => toggleBrandPreference(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
