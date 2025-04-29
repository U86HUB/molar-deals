import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NotificationBanner } from "@/components/dashboard/NotificationBanner";
import { FeaturedDeal } from "@/components/dashboard/FeaturedDeal";
import { DealsTabs } from "@/components/dashboard/DealsTabs";
import { mockDeals } from "@/data/mockDeals";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useLocationStore } from "@/stores/locationStore";
import { toast } from "sonner";

const Dashboard = () => {
  const userIsPremium = false; // In a real app, this would come from auth context
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();
  const { addressStructured, coords, setLocation } = useLocationStore();
  
  // Prefetch related data that user will likely need soon
  useEffect(() => {
    // Prefetch user profile data
    queryClient.prefetchQuery({
      queryKey: ['user-data', 'profile'],
      queryFn: () => {
        // In a real app, this would be an API call
        return Promise.resolve({ name: 'User', email: 'user@example.com' });
      }
    });
    
    // Prefetch upcoming deals that might be clicked
    queryClient.prefetchQuery({
      queryKey: ['deals', 'upcoming'],
      queryFn: () => {
        // In a real app, this would be an API call
        return Promise.resolve(mockDeals.slice(0, 3));
      }
    });
  }, [queryClient]);

  // Check if we should prompt for geolocation
  useEffect(() => {
    // Only prompt for geolocation if:
    // 1. User is authenticated
    // 2. We don't already have their address or coordinates
    // 3. They haven't previously been asked (we could use localStorage to track this)
    if (isAuthenticated && !addressStructured && !coords && navigator.geolocation) {
      // Ask for permission to use geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - store coordinates
          setLocation({
            coords: { 
              lat: position.coords.latitude, 
              lng: position.coords.longitude 
            },
            source: 'google',
            isVerified: true // Mark as verified since we got coordinates
          });
          
          toast.success("Location detected", {
            description: "We'll show deals near your location"
          });
        },
        // Silently fail if user denies geolocation
        () => {}
      );
    }
  }, [isAuthenticated, addressStructured, coords, setLocation]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <DashboardHeader userIsPremium={userIsPremium} />
        <NotificationBanner />
        <FeaturedDeal />
        <DealsTabs deals={mockDeals} userIsPremium={userIsPremium} />
      </main>
    </div>
  );
};

export default Dashboard;
