
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieSettingsModal({ isOpen, onClose }: CookieSettingsModalProps) {
  const [necessaryCookies, setNecessaryCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [preferenceCookies, setPreferenceCookies] = useState(true);

  const handleSave = () => {
    // Here you would typically save the cookie preferences
    // For now we'll just simulate that with a console log
    console.log("Cookie preferences saved:", {
      necessary: necessaryCookies,
      analytics: analyticsCookies,
      marketing: marketingCookies,
      preferences: preferenceCookies,
    });
    
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cookie Settings</DialogTitle>
          <DialogDescription>
            Configure your cookie preferences. Necessary cookies are always enabled as they are essential for the website to function properly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="necessary-cookies" className="text-base">Necessary Cookies</Label>
              <p className="text-sm text-muted-foreground mt-1">
                These cookies are essential for the website to function properly.
              </p>
            </div>
            <Switch 
              id="necessary-cookies" 
              checked={necessaryCookies} 
              onCheckedChange={setNecessaryCookies}
              disabled={true}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics-cookies" className="text-base">Analytics Cookies</Label>
              <p className="text-sm text-muted-foreground mt-1">
                These cookies allow us to count visits and traffic sources.
              </p>
            </div>
            <Switch 
              id="analytics-cookies" 
              checked={analyticsCookies} 
              onCheckedChange={setAnalyticsCookies}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-cookies" className="text-base">Marketing Cookies</Label>
              <p className="text-sm text-muted-foreground mt-1">
                These cookies help us to show you relevant advertisements.
              </p>
            </div>
            <Switch 
              id="marketing-cookies" 
              checked={marketingCookies} 
              onCheckedChange={setMarketingCookies}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="preference-cookies" className="text-base">Preference Cookies</Label>
              <p className="text-sm text-muted-foreground mt-1">
                These cookies enable personalized features on our website.
              </p>
            </div>
            <Switch 
              id="preference-cookies" 
              checked={preferenceCookies} 
              onCheckedChange={setPreferenceCookies}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
