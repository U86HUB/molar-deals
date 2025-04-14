
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NotificationBanner } from "@/components/dashboard/NotificationBanner";
import { FeaturedDeal } from "@/components/dashboard/FeaturedDeal";
import { DealsTabs } from "@/components/dashboard/DealsTabs";
import { mockDeals } from "@/data/mockDeals";

const Dashboard = () => {
  const userIsPremium = false; // In a real app, this would come from auth context

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
