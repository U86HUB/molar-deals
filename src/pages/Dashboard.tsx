
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NotificationBanner } from "@/components/dashboard/NotificationBanner";
import { FeaturedDeal } from "@/components/dashboard/FeaturedDeal";
import { DealsTabs } from "@/components/dashboard/DealsTabs";
import { mockDeals } from "@/data/mockDeals";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const userIsPremium = false; // In a real app, this would come from auth context
  const queryClient = useQueryClient();
  
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
