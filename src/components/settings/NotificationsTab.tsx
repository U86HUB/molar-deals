
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CardHeader, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export function NotificationsTab() {
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Settings saved successfully!");
      setLoading(false);
    }, 1000);
  };
  
  return (
    <TabsContent value="notifications" className="m-0">
      <CardHeader>
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        <p className="text-muted-foreground">
          Control how and when you receive updates
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Deals</p>
                <p className="text-sm text-muted-foreground">
                  Receive emails when new deals are added
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Deal Expiration</p>
                <p className="text-sm text-muted-foreground">
                  Get reminders before deals you've saved expire
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Product Updates</p>
                <p className="text-sm text-muted-foreground">
                  Learn about new features and improvements
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing & Promotions</p>
                <p className="text-sm text-muted-foreground">
                  Receive offers, surveys, and promotional content
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} loading={loading}>
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </TabsContent>
  );
}
