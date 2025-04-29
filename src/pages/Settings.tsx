
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { TabNavigation } from "@/components/settings/TabNavigation";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { AccountTab } from "@/components/settings/AccountTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { PreferencesTab } from "@/components/settings/PreferencesTab";
import { ReferralsTab } from "@/components/settings/ReferralsTab";
import { SubscriptionTab } from "@/components/settings/SubscriptionTab";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const { isAuthenticated, isLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState(tabParam || "profile");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/?showAuth=true', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Update the active tab if the URL query parameter changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/settings?tab=${value}`, { replace: true });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />

      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <TabNavigation activeTab={activeTab} setActiveTab={handleTabChange} />

          <div className="lg:col-span-4">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsContent value="profile">
                <ProfileTab />
              </TabsContent>

              <TabsContent value="account">
                <AccountTab />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>

              <TabsContent value="preferences">
                <PreferencesTab />
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
