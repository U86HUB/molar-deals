
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { globalOption, regions, getRegionById, getAllCountries, getCountryByCode } from "@/data/regionsAndCountries";

export interface LocationData {
  locationType: "global" | "region" | "country";
  regionId?: string;
  countryCode?: string;
  state?: string;
  city?: string;
}

interface LocationSelectorProps {
  value: LocationData;
  onChange: (value: LocationData) => void;
  showCityState?: boolean;
}

export const LocationSelector = ({ value, onChange, showCityState = true }: LocationSelectorProps) => {
  const [selectedType, setSelectedType] = useState<"global" | "region" | "country">(value.locationType || "global");
  const [selectedRegion, setSelectedRegion] = useState<string>(value.regionId || "");
  const [selectedCountry, setSelectedCountry] = useState<string>(value.countryCode || "");
  
  // Initialize with provided values
  useEffect(() => {
    setSelectedType(value.locationType || "global");
    setSelectedRegion(value.regionId || "");
    setSelectedCountry(value.countryCode || "");
  }, [value]);

  // Update parent component when selections change
  useEffect(() => {
    const newValue: LocationData = {
      locationType: selectedType,
      regionId: selectedType === "region" ? selectedRegion : undefined,
      countryCode: selectedType === "country" ? selectedCountry : undefined,
      state: value.state,
      city: value.city
    };
    
    onChange(newValue);
  }, [selectedType, selectedRegion, selectedCountry]);

  // When location type changes, reset other selections
  const handleTypeChange = (type: "global" | "region" | "country") => {
    setSelectedType(type);
    if (type === "global") {
      setSelectedRegion("");
      setSelectedCountry("");
    }
  };

  // When region changes, reset country
  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedCountry("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Location Type</Label>
        <Select value={selectedType} onValueChange={(value: "global" | "region" | "country") => handleTypeChange(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select location type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">{globalOption.name}</SelectItem>
            <SelectItem value="region">Specific Region</SelectItem>
            <SelectItem value="country">Specific Country</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedType === "region" && (
        <div className="space-y-2">
          <Label>Region</Label>
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedType === "country" && (
        <div className="space-y-2">
          <Label>Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {getAllCountries().map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showCityState && selectedType === "country" && selectedCountry === "USA" && (
        <div className="space-y-2">
          <Label>State</Label>
          <Input
            value={value.state || ""}
            onChange={(e) => onChange({ ...value, state: e.target.value })}
            placeholder="Select or enter your state"
          />
        </div>
      )}

      {showCityState && selectedType === "country" && (
        <div className="space-y-2">
          <Label>City (Optional)</Label>
          <Input
            value={value.city || ""}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            placeholder="Enter your city"
          />
        </div>
      )}
    </div>
  );
};
