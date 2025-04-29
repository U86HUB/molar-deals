
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieSettingsModal = ({ isOpen, onClose }: CookieSettingsModalProps) => {
  const [essentialEnabled, setEssentialEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  
  const handleSave = () => {
    // Save cookie preferences
    const preferences = {
      essential: essentialEnabled,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby="cookie-settings-description">
        <DialogHeader>
          <DialogTitle>Cookie Settings</DialogTitle>
          <DialogDescription id="cookie-settings-description">
            Manage your cookie preferences. Essential cookies are required for the website to function properly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-start justify-between space-x-4">
            <div>
              <h4 className="font-medium">Essential Cookies</h4>
              <p className="text-sm text-muted-foreground">
                Required for the website to function. Cannot be disabled.
              </p>
            </div>
            <Switch checked={essentialEnabled} disabled />
          </div>
          
          <div className="flex items-start justify-between space-x-4">
            <div>
              <h4 className="font-medium">Analytics Cookies</h4>
              <p className="text-sm text-muted-foreground">
                Help us improve our website by collecting anonymous usage data.
              </p>
            </div>
            <Switch 
              checked={analyticsEnabled} 
              onCheckedChange={setAnalyticsEnabled} 
              id="analytics"
              aria-label="Toggle analytics cookies"
            />
          </div>
          
          <div className="flex items-start justify-between space-x-4">
            <div>
              <h4 className="font-medium">Marketing Cookies</h4>
              <p className="text-sm text-muted-foreground">
                Allow us to provide personalized ads and content.
              </p>
            </div>
            <Switch 
              checked={marketingEnabled} 
              onCheckedChange={setMarketingEnabled}
              id="marketing"
              aria-label="Toggle marketing cookies"
            />
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex items-center text-sm text-muted-foreground mr-auto">
            <Info className="h-4 w-4 mr-1" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
