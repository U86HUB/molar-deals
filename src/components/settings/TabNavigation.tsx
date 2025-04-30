
import { Button } from "@/components/ui/button";
import { 
  UserCircle, KeyRound, Bell, Settings2, Award, CreditCard, Code
} from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  // Define tabs with their icons and labels
  const tabs = [
    { id: "profile", icon: <UserCircle className="h-5 w-5 mr-2" />, label: "Profile" },
    { id: "account", icon: <KeyRound className="h-5 w-5 mr-2" />, label: "Account" },
    { id: "notifications", icon: <Bell className="h-5 w-5 mr-2" />, label: "Notifications" },
    { id: "preferences", icon: <Settings2 className="h-5 w-5 mr-2" />, label: "Preferences" },
    { id: "referrals", icon: <Award className="h-5 w-5 mr-2" />, label: "Referrals" },
    { id: "subscription", icon: <CreditCard className="h-5 w-5 mr-2" />, label: "Subscription" },
    { id: "developer", icon: <Code className="h-5 w-5 mr-2" />, label: "Developer" }
  ];

  return (
    <div className="lg:block">
      <div className="space-y-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`w-full justify-start ${activeTab === tab.id ? "" : "text-muted-foreground"}`}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
