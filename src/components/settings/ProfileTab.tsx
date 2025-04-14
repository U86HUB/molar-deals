
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export function ProfileTab() {
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Settings saved successfully!");
      setLoading(false);
    }, 1000);
  };
  
  return (
    <TabsContent value="profile" className="m-0">
      <CardHeader>
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p className="text-muted-foreground">
          Update your personal information and how it appears to others
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div>
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="text-3xl">JD</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-base font-medium">Profile Photo</h3>
            <p className="text-sm text-muted-foreground">
              This photo will be displayed on your profile and in comments.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                Upload New Photo
              </Button>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Dr. Jane Doe" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" defaultValue="jane.doe@example.com" readOnly />
            <p className="text-xs text-muted-foreground">
              Your email cannot be changed
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="practice">Practice Name</Label>
            <Input id="practice" defaultValue="Doe Dental Clinic" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Select defaultValue="General Dentist">
              <SelectTrigger id="specialty">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Dentist">General Dentist</SelectItem>
                <SelectItem value="Orthodontist">Orthodontist</SelectItem>
                <SelectItem value="Endodontist">Endodontist</SelectItem>
                <SelectItem value="Periodontist">Periodontist</SelectItem>
                <SelectItem value="Prosthodontist">Prosthodontist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            defaultValue="General dentist with over 10 years of experience, specializing in cosmetic dentistry and Invisalign. Passionate about providing comfortable and comprehensive dental care."
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Brief description of your professional background and interests.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} loading={loading}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </TabsContent>
  );
}
