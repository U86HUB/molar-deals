
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <Card className="lg:col-span-1 h-fit">
      <CardContent className="p-0">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="w-full"
        >
          <TabsList className="flex flex-col h-auto w-full rounded-none space-y-1 bg-transparent">
            <TabsTrigger
              value="profile"
              className="justify-start py-3 px-4 text-left"
            >
              Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="justify-start py-3 px-4 text-left"
            >
              Account Settings
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="justify-start py-3 px-4 text-left"
            >
              Notification Preferences
            </TabsTrigger>
            <TabsTrigger
              value="referrals"
              className="justify-start py-3 px-4 text-left"
            >
              Referrals
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="justify-start py-3 px-4 text-left"
            >
              Subscription
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}
