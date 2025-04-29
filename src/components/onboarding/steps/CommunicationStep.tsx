
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepProps } from "../types";

export const CommunicationStep = ({ userData, updateUserData }: StepProps) => {
  const toggleNotificationType = (type: string) => {
    if (userData.notificationTypes.includes(type)) {
      updateUserData(
        "notificationTypes",
        userData.notificationTypes.filter((t) => t !== type)
      );
    } else {
      updateUserData("notificationTypes", [...userData.notificationTypes, type]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="emailFrequency">Email Frequency</Label>
        <Select
          value={userData.emailFrequency}
          onValueChange={(value) => updateUserData("emailFrequency", value)}
        >
          <SelectTrigger id="emailFrequency">
            <SelectValue placeholder="Select email frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily Digest</SelectItem>
            <SelectItem value="weekly">Weekly Summary</SelectItem>
            <SelectItem value="monthly">Monthly Roundup</SelectItem>
            <SelectItem value="important">Important Updates Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Notification Types</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Select which types of notifications you'd like to receive.
        </p>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="notif-deals" className="cursor-pointer">
              New Deals & Offers
            </Label>
            <Switch
              id="notif-deals"
              checked={userData.notificationTypes.includes("deals")}
              onCheckedChange={() => toggleNotificationType("deals")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notif-account" className="cursor-pointer">
              Account Updates
            </Label>
            <Switch
              id="notif-account"
              checked={userData.notificationTypes.includes("account")}
              onCheckedChange={() => toggleNotificationType("account")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notif-events" className="cursor-pointer">
              Educational Events & Webinars
            </Label>
            <Switch
              id="notif-events"
              checked={userData.notificationTypes.includes("events")}
              onCheckedChange={() => toggleNotificationType("events")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notif-community" className="cursor-pointer">
              Community Updates
            </Label>
            <Switch
              id="notif-community"
              checked={userData.notificationTypes.includes("community")}
              onCheckedChange={() => toggleNotificationType("community")}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="marketingConsent"
          checked={userData.marketingConsent}
          onCheckedChange={(checked) =>
            updateUserData("marketingConsent", checked === true)
          }
        />
        <Label htmlFor="marketingConsent" className="text-sm">
          I agree to receive emails about new deals and promotions.
          You can unsubscribe at any time.
        </Label>
      </div>
    </div>
  );
};
