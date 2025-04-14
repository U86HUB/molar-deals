
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon } from "lucide-react";

export const BrandDetailsCard = () => {
  return (
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
  );
};
