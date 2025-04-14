
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DealTargetingCard = () => {
  return (
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
  );
};
