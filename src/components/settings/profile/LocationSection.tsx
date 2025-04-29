
import { AddressSelector } from "./AddressSelector";

interface LocationSectionProps {
  googleMapsApiKey: string;
}

export const LocationSection = ({ googleMapsApiKey }: LocationSectionProps) => {
  return (
    <div className="space-y-2">
      <AddressSelector googleMapsApiKey={googleMapsApiKey} />
    </div>
  );
};
