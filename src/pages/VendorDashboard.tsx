
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart3,
  PlusCircle, 
  LineChart, 
  ListChecks,
  Star,
  TrendingUp,
  BarChart,
  CreditCard,
  Settings as SettingsIcon
} from "lucide-react";

import { VendorDealsTab } from "@/components/vendor/VendorDealsTab";
import { VendorAnalyticsTab } from "@/components/vendor/VendorAnalyticsTab";
import { VendorSettingsTab } from "@/components/vendor/VendorSettingsTab";
import { VendorCreateDealForm } from "@/components/vendor/VendorCreateDealForm";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("deals");
  const [showCreateDeal, setShowCreateDeal] = useState(false);
  const isPremium = false; // In a real app, this would come from auth/subscription context

  // Toggle create deal form
  const toggleCreateDeal = () => {
    setShowCreateDeal(!showCreateDeal);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage deals for dental professionals
            </p>
          </div>
          
          {!isPremium && (
            <Button variant="success" className="md:self-end">
              <Star className="mr-2 h-4 w-4" />
              Upgrade to Premium
            </Button>
          )}
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-purple-50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Deals</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <ListChecks className="h-8 w-8 text-primary opacity-70" />
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">1,248</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500 opacity-70" />
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold">72</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500 opacity-70" />
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
              <TabsTrigger value="deals" className="flex items-center gap-1">
                <ListChecks className="h-4 w-4" /> 
                <span className="hidden sm:block">My Deals</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" /> 
                <span className="hidden sm:block">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <SettingsIcon className="h-4 w-4" /> 
                <span className="hidden sm:block">Settings</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button onClick={toggleCreateDeal} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Deal
          </Button>
        </div>
        
        {showCreateDeal && (
          <Card className="mb-8 border-primary/30">
            <CardContent className="p-6">
              <VendorCreateDealForm onClose={toggleCreateDeal} />
            </CardContent>
          </Card>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="deals" className="mt-0">
            <VendorDealsTab />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <VendorAnalyticsTab isPremium={isPremium} />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <VendorSettingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorDashboard;
