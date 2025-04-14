
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BellRing } from "lucide-react";
import { useState } from "react";

export const NotificationSettingsCard = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dealApproved, setDealApproved] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Notification Settings</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-muted-foreground">Receive emails for important updates</p>
          </div>
          <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Deal Approved</p>
            <p className="text-sm text-muted-foreground">When your deal is approved by our team</p>
          </div>
          <Switch checked={dealApproved} onCheckedChange={setDealApproved} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Analytics Reports</p>
            <p className="text-sm text-muted-foreground">Weekly summary of your deal performance</p>
          </div>
          <Switch checked={analytics} onCheckedChange={setAnalytics} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Marketing Emails</p>
            <p className="text-sm text-muted-foreground">Tips and promotional offers</p>
          </div>
          <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
        </div>
      </CardContent>
    </Card>
  );
};
