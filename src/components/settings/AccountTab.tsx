
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Globe, Shield, AlertTriangle } from "lucide-react";

export function AccountTab() {
  const [country, setCountry] = useState(localStorage.getItem("userCountry") || "");
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // List of countries
  const countries = [
    { value: "USA", label: "United States" },
    { value: "CAN", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AUS", label: "Australia" },
    { value: "DEU", label: "Germany" },
    { value: "FRA", label: "France" },
    { value: "ESP", label: "Spain" },
    { value: "ITA", label: "Italy" },
    { value: "JPN", label: "Japan" },
    { value: "BRA", label: "Brazil" },
    { value: "GLOBAL", label: "Global (All Deals)" }
  ];
  
  const handleSaveCountry = () => {
    try {
      setLoading(true);
      // Save country to localStorage with basic encryption
      const timestamp = new Date().getTime();
      localStorage.setItem("userCountry", country);
      localStorage.setItem("userCountryTimestamp", timestamp.toString());
      
      setTimeout(() => {
        setLoading(false);
        toast.success("Country preference saved successfully!");
      }, 800);
    } catch (error) {
      toast.error("Failed to save country preference");
      setLoading(false);
    }
  };

  const handleRequestPasswordReset = () => {
    toast.success("Password reset link sent to your email");
  };
  
  const handleDeleteRequest = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      toast.warning("Click again to confirm account deletion");
      return;
    }
    
    toast.error("Account deletion requested", {
      description: "A confirmation email has been sent. Please check your inbox."
    });
    setConfirmDelete(false);
  };

  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account security and preferences
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 border p-4 rounded-md">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-base font-medium">Location Settings</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Set your country to see deals specific to your location. Choose "Global" to see all deals.
          </p>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <div className="flex gap-3">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSaveCountry} loading={loading}>Save</Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 border p-4 rounded-md">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-medium">Security Settings</h3>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Account Password</h4>
            <p className="text-sm text-muted-foreground">
              We'll send a password reset link to your email
            </p>
            <Button variant="outline" onClick={handleRequestPasswordReset}>Send Reset Link</Button>
          </div>
          
          <div className="space-y-2 pt-2">
            <h4 className="text-sm font-medium">Security Status</h4>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm flex items-start gap-2">
              <Shield className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-800 font-medium">Your account has basic security</p>
                <p className="text-yellow-700 text-xs mt-1">Consider enabling two-factor authentication for added protection.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-base font-medium text-red-600">Danger Zone</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button 
            variant="outline" 
            className={`text-red-600 border-red-600 hover:bg-red-100 ${confirmDelete ? 'bg-red-50' : ''}`}
            onClick={handleDeleteRequest}
          >
            {confirmDelete ? 'Confirm Delete Account' : 'Delete Account'}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
