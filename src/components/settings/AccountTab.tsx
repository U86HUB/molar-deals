
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Globe } from "lucide-react";

export function AccountTab() {
  const [country, setCountry] = useState(localStorage.getItem("userCountry") || "");
  const [loading, setLoading] = useState(false);
  
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
    setLoading(true);
    // Save country to localStorage
    localStorage.setItem("userCountry", country);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Country preference saved successfully!");
    }, 800);
  };

  return (
    <TabsContent value="account" className="m-0">
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
        
        <div className="space-y-2">
          <h3 className="text-base font-medium">Change Password</h3>
          <p className="text-sm text-muted-foreground">
            We'll send a password reset link to your email
          </p>
          <Button variant="outline">Send Reset Link</Button>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-base font-medium text-red-600 mb-2">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-100">Delete Account</Button>
        </div>
      </CardContent>
    </TabsContent>
  );
}
