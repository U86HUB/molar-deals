
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreditCard, Globe, Settings as SettingsIcon, BellRing } from "lucide-react";
import { useState } from "react";

export const VendorSettingsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dealApproved, setDealApproved] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Vendor Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Brand Details</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input id="brandName" placeholder="Your brand name" defaultValue="DentalSupplyCo" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="https://example.com" defaultValue="https://dentalsupplyco.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Brand Description</Label>
              <Input id="description" placeholder="Brief description of your brand" defaultValue="Premier supplier of dental equipment and materials" />
            </div>
            
            <div className="space-y-2">
              <Label>Brand Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded bg-muted flex items-center justify-center text-muted-foreground">
                  Logo
                </div>
                <Button variant="outline" size="sm">Upload New Logo</Button>
              </div>
              <p className="text-xs text-muted-foreground">Recommended size: 400x400px, max 2MB</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Deal Targeting</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryCategory">Primary Category</Label>
              <Select defaultValue="equipment">
                <SelectTrigger id="primaryCategory">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="materials">Dental Materials</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="patient-care">Patient Care Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="countries">Available Countries</Label>
              <Select defaultValue="global">
                <SelectTrigger id="countries">
                  <SelectValue placeholder="Select countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global (All Countries)</SelectItem>
                  <SelectItem value="usa">United States Only</SelectItem>
                  <SelectItem value="europe">Europe Only</SelectItem>
                  <SelectItem value="asia">Asia Only</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Premium vendors can target specific regions and create country-specific offers</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialties">Target Specialties</Label>
              <Select defaultValue="all">
                <SelectTrigger id="specialties">
                  <SelectValue placeholder="Select specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dental Professionals</SelectItem>
                  <SelectItem value="general">General Dentistry</SelectItem>
                  <SelectItem value="orthodontics">Orthodontics</SelectItem>
                  <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
                  <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
                  <SelectItem value="periodontics">Periodontics</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Premium vendors can target multiple specialties</p>
            </div>
          </CardContent>
        </Card>
        
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
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Billing</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-md bg-gray-50">
              <p className="font-medium">Current Plan: Free</p>
              <p className="text-sm text-muted-foreground mb-4">Basic vendor features</p>
              <Button variant="outline" className="w-full">
                Upgrade to Premium
              </Button>
            </div>
            
            <div>
              <p className="font-medium mb-2">Premium Benefits:</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  Advanced analytics and reporting
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  Country-specific targeting
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  Featured placement in deal listings
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  Create unlimited deals
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Small Check icon component
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
