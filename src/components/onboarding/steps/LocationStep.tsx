
import { StepProps } from "../types";
import { GeolocationSection } from "../components/location/GeolocationSection";
import { AddressEntrySection } from "../components/location/AddressEntrySection";
import { LocationData } from "@/components/shared/LocationSelector";

export const LocationStep = ({ userData, updateUserData }: StepProps) => {
  // Convert from userData format to LocationSelector format
  const locationData: LocationData = {
    locationType: "country",
    countryCode: userData.country,
    state: userData.state,
    city: userData.city,
    streetAddress: userData.streetAddress,
    postalCode: userData.postalCode
  };

  const handleGeolocationChange = (useGeolocation: boolean) => {
    updateUserData("useGeolocation", useGeolocation);
  };

  const handleLocationChange = (location: LocationData) => {
    if (location.locationType === "global") {
      updateUserData("country", "GLOBAL");
      updateUserData("state", "");
      updateUserData("city", "");
      updateUserData("streetAddress", "");
      updateUserData("postalCode", "");
    } else if (location.locationType === "country" && location.countryCode) {
      updateUserData("country", location.countryCode);
      updateUserData("state", location.state || "");
      updateUserData("city", location.city || "");
      updateUserData("streetAddress", location.streetAddress || "");
      updateUserData("postalCode", location.postalCode || "");
    }
  };

  const handleAddressComponentsChange = (components: {
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) => {
    updateUserData("streetAddress", components.streetAddress);
    updateUserData("city", components.city);
    updateUserData("state", components.state);
    updateUserData("country", components.country);
    updateUserData("postalCode", components.postalCode);
  };

  return (
    <div className="space-y-6">
      <GeolocationSection
        initialStatus={userData.useGeolocation ? "granted" : "idle"}
        onGeolocationChange={handleGeolocationChange}
      />
      
      <AddressEntrySection
        locationData={locationData}
        onLocationChange={handleLocationChange}
        onAddressComponentsChange={handleAddressComponentsChange}
      />
    </div>
  );
};
