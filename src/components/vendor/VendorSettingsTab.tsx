
import { BrandDetailsCard } from "./settings/BrandDetailsCard";
import { DealTargetingCard } from "./settings/DealTargetingCard";
import { NotificationSettingsCard } from "./settings/NotificationSettingsCard";
import { BillingCard } from "./settings/BillingCard";

export const VendorSettingsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Vendor Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BrandDetailsCard />
        <DealTargetingCard />
        <NotificationSettingsCard />
        <BillingCard />
      </div>
    </div>
  );
};
