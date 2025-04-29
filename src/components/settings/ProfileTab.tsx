
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileData } from "@/hooks/useProfileData";
import { PersonalInfoCard } from "./profile/PersonalInfoCard";
import { ClinicInfoCard } from "./profile/ClinicInfoCard";
import { FormProvider, useForm } from "react-hook-form";

export function ProfileTab() {
  const {
    profileData,
    loading,
    handleSave
  } = useProfileData();
  
  const methods = useForm({
    defaultValues: profileData
  });
  
  // Update form when profile data changes (e.g. on initial load)
  React.useEffect(() => {
    methods.reset(profileData);
  }, [profileData, methods]);

  const onSubmit = async (data: any) => {
    await handleSave(data);
  };

  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p className="text-muted-foreground">
          Update your personal information and how it appears to others
        </p>
      </CardHeader>
      
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoCard />
            <ClinicInfoCard />
            
            <div className="flex justify-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </div>
  );
}
