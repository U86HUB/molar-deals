
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileData } from "@/hooks/profile/useProfileData";
import { PersonalInfoCard } from "./profile/PersonalInfoCard";
import { ClinicInfoCard } from "./profile/ClinicInfoCard";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

export function ProfileTab() {
  const { user, isLoading: authLoading } = useAuth();
  
  const {
    profileData,
    loading,
    handleSave,
    loadProfileData
  } = useProfileData();
  
  const personalMethods = useForm({
    defaultValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      specialty: profileData.specialty,
      yearsOfExperience: profileData.yearsOfExperience,
      bio: profileData.bio
    }
  });
  
  const clinicMethods = useForm({
    defaultValues: {
      practiceName: profileData.practiceName,
      practiceSize: profileData.practiceSize,
      clinicBio: profileData.clinicBio || "",
    }
  });
  
  // Load profile data after authentication is confirmed
  useEffect(() => {
    if (!authLoading && user) {
      loadProfileData();
    }
  }, [authLoading, user, loadProfileData]);
  
  // Update form when profile data changes (e.g. on initial load)
  useEffect(() => {
    console.log("Resetting form with data:", profileData);
    personalMethods.reset({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      specialty: profileData.specialty,
      yearsOfExperience: profileData.yearsOfExperience,
      bio: profileData.bio
    });
    
    clinicMethods.reset({
      practiceName: profileData.practiceName,
      practiceSize: profileData.practiceSize,
      clinicBio: profileData.clinicBio || "",
    });
  }, [profileData]);

  const onPersonalSubmit = async (data: any) => {
    console.log("Submitting personal info:", data);
    await handleSave({
      ...profileData,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      specialty: data.specialty,
      yearsOfExperience: data.yearsOfExperience,
      bio: data.bio
    });
  };
  
  const onClinicSubmit = async (data: any) => {
    console.log("Submitting clinic info:", data);
    await handleSave({
      ...profileData,
      practiceName: data.practiceName,
      practiceSize: data.practiceSize,
      clinicBio: data.clinicBio
    });
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
        <div className="space-y-8">
          <FormProvider {...personalMethods}>
            <PersonalInfoCard 
              onSubmit={personalMethods.handleSubmit(onPersonalSubmit)}
              loading={loading} 
            />
          </FormProvider>
          
          <FormProvider {...clinicMethods}>
            <ClinicInfoCard 
              onSubmit={clinicMethods.handleSubmit(onClinicSubmit)}
              loading={loading} 
            />
          </FormProvider>
        </div>
      </CardContent>
    </div>
  );
}
