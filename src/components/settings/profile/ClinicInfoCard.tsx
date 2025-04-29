
import { useFormContext } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddressSelector } from "@/components/settings/profile/AddressSelector";
import { useProfileData } from "@/hooks/useProfileData";

// Get Google Maps API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

export const ClinicInfoCard = () => {
  const { register, watch, setValue } = useFormContext();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="practiceName">Practice Name (Optional)</Label>
            <Input
              id="practiceName"
              {...register("practiceName")}
              placeholder="Practice Name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="practiceSize">Practice Size (Optional)</Label>
            <Select 
              value={watch("practiceSize")} 
              onValueChange={(value) => setValue("practiceSize", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select practice size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo Practice</SelectItem>
                <SelectItem value="small">Small Group (2-5 dentists)</SelectItem>
                <SelectItem value="medium">Medium Group (6-15 dentists)</SelectItem>
                <SelectItem value="large">Large Group (16+ dentists)</SelectItem>
                <SelectItem value="dso">DSO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Practice Location */}
        <div>
          <Label className="text-base font-medium">Practice Location</Label>
          <div className="mt-2">
            <AddressSelector googleMapsApiKey={GOOGLE_MAPS_API_KEY} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
