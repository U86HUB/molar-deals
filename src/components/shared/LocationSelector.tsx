
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getAllCountries, getCountryByCode } from "@/data/regionsAndCountries";

export interface LocationData {
  locationType: "global" | "region" | "country";
  regionId?: string;
  countryCode?: string;
  state?: string;
  city?: string;
  streetAddress?: string;
  postalCode?: string;
}

interface LocationSelectorProps {
  value: LocationData;
  onChange: (value: LocationData) => void;
  showCityState?: boolean;
  showAddress?: boolean;
  allowGlobal?: boolean;
  allowRegion?: boolean;
}

export const LocationSelector = ({ 
  value, 
  onChange, 
  showCityState = true, 
  showAddress = false,
  allowGlobal = true,
  allowRegion = true
}: LocationSelectorProps) => {
  const [selectedType, setSelectedType] = useState<"global" | "region" | "country">(value.locationType || "global");
  const [selectedRegion, setSelectedRegion] = useState<string>(value.regionId || "");
  const [selectedCountry, setSelectedCountry] = useState<string>(value.countryCode || "");
  
  // Initialize with provided values
  useEffect(() => {
    setSelectedType(value.locationType || (allowGlobal ? "global" : "country"));
    setSelectedRegion(value.regionId || "");
    setSelectedCountry(value.countryCode || "");
  }, [value, allowGlobal]);

  // Update parent component when selections change
  useEffect(() => {
    const newValue: LocationData = {
      locationType: selectedType,
      regionId: selectedType === "region" ? selectedRegion : undefined,
      countryCode: selectedType === "country" ? selectedCountry : undefined,
      state: value.state,
      city: value.city,
      streetAddress: value.streetAddress,
      postalCode: value.postalCode
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
      {(allowGlobal || allowRegion) && (
        <div className="space-y-2">
          <Label>Location Type</Label>
          <Select value={selectedType} onValueChange={(value: "global" | "region" | "country") => handleTypeChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select location type" />
            </SelectTrigger>
            <SelectContent>
              {allowGlobal && <SelectItem value="global">Global (All Countries)</SelectItem>}
              {allowRegion && <SelectItem value="region">Specific Region</SelectItem>}
              <SelectItem value="country">Specific Country</SelectItem>
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

      {showCityState && selectedType === "country" && (
        <div className="space-y-2">
          <Label>State/Province</Label>
          <Input
            value={value.state || ""}
            onChange={(e) => onChange({ ...value, state: e.target.value })}
            placeholder="Enter your state or province"
          />
        </div>
      )}

      {showCityState && selectedType === "country" && (
        <div className="space-y-2">
          <Label>City</Label>
          <Input
            value={value.city || ""}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            placeholder="Enter your city"
          />
        </div>
      )}

      {showAddress && selectedType === "country" && (
        <>
          <div className="space-y-2">
            <Label>Street Address</Label>
            <Input
              value={value.streetAddress || ""}
              onChange={(e) => onChange({ ...value, streetAddress: e.target.value })}
              placeholder="Enter your street address"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Postal/ZIP Code</Label>
            <Input
              value={value.postalCode || ""}
              onChange={(e) => onChange({ ...value, postalCode: e.target.value })}
              placeholder="Enter your postal code"
            />
          </div>
        </>
      )}
    </div>
  );
};
