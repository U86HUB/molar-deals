
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function NotificationsTab() {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    emailFrequency: "weekly",
    notificationTypes: {
      deals: true,
      account: true,
      events: false,
      community: false
    },
    marketingConsent: false
  });
  
  useEffect(() => {
    // Initialize from user metadata
    if (user?.user_metadata?.communication_preferences) {
      const prefs = user.user_metadata.communication_preferences;
      setPreferences({
        emailFrequency: prefs.email_frequency || "weekly",
        notificationTypes: {
          deals: prefs.notification_types?.includes("deals") || false,
          account: prefs.notification_types?.includes("account") || false,
          events: prefs.notification_types?.includes("events") || false,
          community: prefs.notification_types?.includes("community") || false
        },
        marketingConsent: prefs.marketing_consent || false
      });
    }
  }, [user]);
  
  const handleSave = async () => {
    setLoading(true);
    try {
      // Convert to format expected by user metadata
      const notificationTypes = Object.entries(preferences.notificationTypes)
        .filter(([_, enabled]) => enabled)
        .map(([type]) => type);
      
      await updateUserProfile({
        communication_preferences: {
          email_frequency: preferences.emailFrequency,
          notification_types: notificationTypes,
          marketing_consent: preferences.marketingConsent
        }
      });
      
      toast.success("Notification preferences saved successfully!");
    } catch (error) {
      console.error("Error saving notification preferences:", error);
      toast.error("Failed to save notification preferences");
    } finally {
      setLoading(false);
    }
  };
  
  const toggleNotificationType = (type: string) => {
    setPreferences({
      ...preferences,
      notificationTypes: {
        ...preferences.notificationTypes,
        [type]: !preferences.notificationTypes[type as keyof typeof preferences.notificationTypes]
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        <p className="text-muted-foreground">
          Control how and when you receive updates
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium">Email Frequency</h3>
          <div className="space-y-2">
            <Label htmlFor="emailFrequency">How often would you like to receive email updates?</Label>
            <Select
              value={preferences.emailFrequency}
              onValueChange={value => setPreferences({...preferences, emailFrequency: value})}
            >
              <SelectTrigger id="emailFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
                <SelectItem value="monthly">Monthly Roundup</SelectItem>
                <SelectItem value="important">Important Updates Only</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This sets how frequently we'll send you emails about new deals and updates.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Notification Types</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Deals</p>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when new deals are added
                </p>
              </div>
              <Switch 
                checked={preferences.notificationTypes.deals}
                onCheckedChange={() => toggleNotificationType("deals")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Updates</p>
                <p className="text-sm text-muted-foreground">
                  Security alerts and important account information
                </p>
              </div>
              <Switch 
                checked={preferences.notificationTypes.account}
                onCheckedChange={() => toggleNotificationType("account")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Educational Events</p>
                <p className="text-sm text-muted-foreground">
                  Webinars, courses, and educational content
                </p>
              </div>
              <Switch 
                checked={preferences.notificationTypes.events}
                onCheckedChange={() => toggleNotificationType("events")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Community Updates</p>
                <p className="text-sm text-muted-foreground">
                  Forum posts, discussions, and community news
                </p>
              </div>
              <Switch 
                checked={preferences.notificationTypes.community}
                onCheckedChange={() => toggleNotificationType("community")}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketingConsent"
              checked={preferences.marketingConsent}
              onCheckedChange={(checked) => 
                setPreferences({...preferences, marketingConsent: checked === true})
              }
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="marketingConsent" className="text-sm">
                I agree to receive emails about new deals, promotions, and product recommendations.
              </Label>
              <p className="text-xs text-muted-foreground">
                You can unsubscribe at any time. View our Privacy Policy for more information.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
