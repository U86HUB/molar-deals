
import { useState, Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";

// Lazy load admin tabs for better performance
const DealManagementTab = lazy(() => import("@/components/admin/DealManagementTab"));
const VendorManagementTab = lazy(() => import("@/components/admin/VendorManagementTab"));
const UserManagementTab = lazy(() => import("@/components/admin/UserManagementTab"));
const ReferralManagementTab = lazy(() => import("@/components/admin/ReferralManagementTab"));
const AnalyticsTab = lazy(() => import("@/components/admin/AnalyticsTab"));
const SettingsTab = lazy(() => import("@/components/admin/SettingsTab"));

// Placeholder for future content management tab
const ContentManagementTab = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <h2 className="text-2xl font-bold mb-4">Content Management</h2>
    <p className="text-muted-foreground mb-6">This feature is coming soon.</p>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("deals");

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | DentalDeals</title>
        <meta name="description" content="Admin dashboard for managing dental deals, vendors, users, and referrals." />
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 overflow-auto">
          <AdminHeader />
          
          <main className="container mx-auto px-4 py-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="deals">Deals</TabsTrigger>
                <TabsTrigger value="vendors">Vendors</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="content" disabled>Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <Suspense fallback={
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
                  <span>Loading...</span>
                </div>
              }>
                <TabsContent value="deals">
                  <DealManagementTab />
                </TabsContent>
                <TabsContent value="vendors">
                  <VendorManagementTab />
                </TabsContent>
                <TabsContent value="users">
                  <UserManagementTab />
                </TabsContent>
                <TabsContent value="referrals">
                  <ReferralManagementTab />
                </TabsContent>
                <TabsContent value="analytics">
                  <AnalyticsTab />
                </TabsContent>
                <TabsContent value="content">
                  <ContentManagementTab />
                </TabsContent>
                <TabsContent value="settings">
                  <SettingsTab />
                </TabsContent>
              </Suspense>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
