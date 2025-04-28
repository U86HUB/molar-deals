
import { BrandDetailsCard } from "./settings/BrandDetailsCard";
import { DealTargetingCard } from "./settings/DealTargetingCard";
import { NotificationSettingsCard } from "./settings/NotificationSettingsCard";
import { BillingCard } from "./settings/BillingCard";
import { SecuritySettingsCard } from "./settings/SecuritySettingsCard";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export const VendorSettingsTab = () => {
  // Log performance metrics for monitoring
  useEffect(() => {
    // Measure and log page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        console.log(`Page load time: ${timing.loadEventEnd - timing.startTime}ms`);
      });
    }
    
    // Component cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', () => {});
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Vendor Settings | DentalDeals</title>
        <meta name="description" content="Manage your vendor account settings, security preferences, and notification options." />
      </Helmet>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Vendor Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecuritySettingsCard />
          <BrandDetailsCard />
          <DealTargetingCard />
          <NotificationSettingsCard />
          <BillingCard />
        </div>
      </div>
    </>
  );
};
