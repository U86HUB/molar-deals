
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { specialties } from "@/components/onboarding/data/onboardingOptions";
import { LocationSelector, LocationData } from "@/components/shared/LocationSelector";

export function ProfileTab() {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    practiceName: user?.user_metadata?.practice_name || "",
    specialty: user?.user_metadata?.specialty || "General Dentist",
    yearsOfExperience: user?.user_metadata?.years_of_experience || "0-5",
    practiceSize: user?.user_metadata?.practice_size || "solo",
    bio: user?.user_metadata?.bio || ""
  });
  
  const [locationData, setLocationData] = useState<LocationData>({
    locationType: "country",
    countryCode: user?.user_metadata?.location?.country || "",
    state: user?.user_metadata?.location?.state || "",
    city: user?.user_metadata?.location?.city || "",
    streetAddress: user?.user_metadata?.street_address || "",
    postalCode: user?.user_metadata?.postal_code || ""
  });
  
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
        practiceName: user.user_metadata?.practice_name || "",
        specialty: user.user_metadata?.specialty || "General Dentist",
        yearsOfExperience: user.user_metadata?.years_of_experience || "0-5",
        practiceSize: user.user_metadata?.practice_size || "solo",
        bio: user.user_metadata?.bio || ""
      });
      
      setLocationData({
        locationType: "country",
        countryCode: user.user_metadata?.location?.country || "",
        state: user.user_metadata?.location?.state || "",
        city: user.user_metadata?.location?.city || "",
        streetAddress: user.user_metadata?.street_address || "",
        postalCode: user.user_metadata?.postal_code || ""
      });
    }
  }, [user]);
  
  const handleSave = async () => {
    setLoading(true);
    try {
      // Format location data
      const locationMetadata = {
        country: locationData.countryCode || "",
        state: locationData.state || "",
        city: locationData.city || "",
        use_geolocation: false
      };
      
      await updateUserProfile({
        full_name: profileData.name,
        practice_name: profileData.practiceName,
        specialty: profileData.specialty,
        years_of_experience: profileData.yearsOfExperience,
        practice_size: profileData.practiceSize,
        phone: profileData.phone,
        bio: profileData.bio,
        street_address: locationData.streetAddress || "",
        postal_code: locationData.postalCode || "",
        location: locationMetadata
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
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
              <AvatarFallback className="text-3xl">
                {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || "?"}
              </AvatarFallback>
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
            <Input 
              id="name" 
              value={profileData.name}
              onChange={e => setProfileData({...profileData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" value={profileData.email} readOnly />
            <p className="text-xs text-muted-foreground">
              Your email cannot be changed
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              value={profileData.phone}
              onChange={e => setProfileData({...profileData, phone: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="practice">Practice Name</Label>
            <Input 
              id="practice" 
              value={profileData.practiceName}
              onChange={e => setProfileData({...profileData, practiceName: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Select 
              value={profileData.specialty}
              onValueChange={value => setProfileData({...profileData, specialty: value})}
            >
              <SelectTrigger id="specialty">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Select 
              value={profileData.yearsOfExperience}
              onValueChange={value => setProfileData({...profileData, yearsOfExperience: value})}
            >
              <SelectTrigger id="yearsOfExperience">
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5">0-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="11-20">11-20 years</SelectItem>
                <SelectItem value="20+">20+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="practiceSize">Practice Size</Label>
            <Select 
              value={profileData.practiceSize}
              onValueChange={value => setProfileData({...profileData, practiceSize: value})}
            >
              <SelectTrigger id="practiceSize">
                <SelectValue placeholder="Select practice size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo Practice</SelectItem>
                <SelectItem value="small">Small Group (2-5 dentists)</SelectItem>
                <SelectItem value="medium">Medium Group (6-20 dentists)</SelectItem>
                <SelectItem value="large">Large Group / DSO (20+ dentists)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-base font-medium">Location & Address</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter the location and address of your practice
          </p>
          
          <LocationSelector 
            value={locationData}
            onChange={setLocationData}
            allowGlobal={false}
            allowRegion={false}
            showAddress={true}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={e => setProfileData({...profileData, bio: e.target.value})}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Brief description of your professional background and interests.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
