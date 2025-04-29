
import { useFormContext } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const PersonalInfoCard = () => {
  const { register, watch, setValue } = useFormContext();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First + Last Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="First Name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Last Name"
          />
        </div>
        
        {/* Email + Phone */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email Address"
            readOnly
          />
          <p className="text-xs text-muted-foreground">
            Your email address is managed by your account settings.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="Phone Number"
          />
        </div>
        
        {/* Specialty + Years */}
        <div className="space-y-2">
          <Label htmlFor="specialty">Specialty (Optional)</Label>
          <Select 
            value={watch("specialty")} 
            onValueChange={(value) => setValue("specialty", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Dentist">General Dentist</SelectItem>
              <SelectItem value="Orthodontist">Orthodontist</SelectItem>
              <SelectItem value="Periodontist">Periodontist</SelectItem>
              <SelectItem value="Oral Surgeon">Oral Surgeon</SelectItem>
              <SelectItem value="Endodontist">Endodontist</SelectItem>
              <SelectItem value="Pediatric Dentist">Pediatric Dentist</SelectItem>
              <SelectItem value="Prosthodontist">Prosthodontist</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience (Optional)</Label>
          <Select 
            value={watch("yearsOfExperience")} 
            onValueChange={(value) => setValue("yearsOfExperience", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-5">0-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="11-15">11-15 years</SelectItem>
              <SelectItem value="16-20">16-20 years</SelectItem>
              <SelectItem value="21+">21+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Personal Bio (full width) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Personal Bio (Optional)</Label>
          <Textarea
            id="bio"
            {...register("bio")}
            placeholder="Tell us about yourself"
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};
