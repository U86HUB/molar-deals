
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabNavigation } from "@/components/settings/TabNavigation";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { AccountTab } from "@/components/settings/AccountTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { ReferralsTab } from "@/components/settings/ReferralsTab";
import { SubscriptionTab } from "@/components/settings/SubscriptionTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and information
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <Card className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
