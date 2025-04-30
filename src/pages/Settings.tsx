
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { TabNavigation } from "@/components/settings/TabNavigation";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { AccountTab } from "@/components/settings/AccountTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { ReferralsTab } from "@/components/settings/ReferralsTab";
import { SubscriptionTab } from "@/components/settings/SubscriptionTab";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const Settings = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || "profile");

  // Update the active tab if the URL query parameter changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />

      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="lg:col-span-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile">
                <ProfileTab />
              </TabsContent>

              <TabsContent value="account">
                <AccountTab />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>

              <TabsContent value="referrals">
                <ReferralsTab />
              </TabsContent>

              <TabsContent value="subscription">
                <SubscriptionTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
