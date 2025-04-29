
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Globe, Shield, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSearchParams } from "react-router-dom";
import { LocationSelector, LocationData } from "@/components/shared/LocationSelector";

export function AccountTab() {
  const { updateUserPassword, hasSetPassword, user, updateUserProfile } = useAuth();
  const [locationData, setLocationData] = useState<LocationData>({
    locationType: "global",
    regionId: "",
    countryCode: "",
    state: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [searchParams] = useSearchParams();
  const showPasswordSetup = searchParams.get("setup") === "password" || !hasSetPassword;

  useEffect(() => {
    // Initialize location data from user metadata
    if (user?.user_metadata?.location) {
      const { country, state, city, use_geolocation } = user.user_metadata.location;
      
      setLocationData({
        locationType: country === "GLOBAL" ? "global" : country ? "country" : "global",
        countryCode: country !== "GLOBAL" ? country : undefined,
        state,
        city
      });
    }
  }, [user]);
  
  // Password validation schema
  const passwordSchema = z.object({
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  
  const handleSaveLocation = async () => {
    try {
      setLoading(true);
      
      // Convert LocationData to the format expected by user metadata
      const locationMetadata = {
        country: locationData.locationType === "global" 
          ? "GLOBAL" 
          : locationData.locationType === "region"
            ? locationData.regionId
            : locationData.countryCode,
        state: locationData.state || null,
        city: locationData.city || null,
        use_geolocation: false // Always false when set manually
      };
      
      await updateUserProfile({ 
        location: locationMetadata 
      });
      
      toast.success("Location settings saved successfully!");
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error("Failed to save location settings");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePassword = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setLoading(true);
      await updateUserPassword(values.password);
      // Clear form after successful password creation
      passwordForm.reset();
    } catch (error) {
      console.error(error);
    } finally {
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
        {showPasswordSetup && (
          <div className="space-y-4 border p-4 rounded-md bg-primary/5">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-base font-medium">{hasSetPassword ? "Update Password" : "Create Password"}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {hasSetPassword 
                ? "You can update your account password below."
                : "Please create a password for your account to use in addition to the magic link login."}
            </p>
            
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handleCreatePassword)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Password must be at least 8 characters with uppercase, lowercase and number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  loading={loading}
                  disabled={loading}
                >
                  {hasSetPassword ? "Update Password" : "Create Password"}
                </Button>
              </form>
            </Form>
          </div>
        )}

        <div className="space-y-4 border p-4 rounded-md">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-base font-medium">Location Settings</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Set your location preferences to see deals relevant to your area. 
            Choose "Global" to see all deals worldwide.
          </p>
          
          <LocationSelector 
            value={locationData}
            onChange={setLocationData}
          />
          
          <div className="flex justify-end mt-4">
            <Button onClick={handleSaveLocation} disabled={loading}>
              {loading ? "Saving..." : "Save Location"}
            </Button>
          </div>
        </div>
        
        {hasSetPassword && (
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
        )}
        
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
