
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SystemHealthDashboard } from "@/components/monitoring/SystemHealthDashboard";
import { healthService } from "@/services/healthService";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const SystemHealth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [healthData, setHealthData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an actual API call
        const data = await healthService.getHealthMetrics();
        setHealthData(data);
      } catch (error) {
        console.error("Failed to fetch health data:", error);
        toast({
          title: "Error fetching health data",
          description: "Could not retrieve system health metrics",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData();
    
    // Set up polling for live updates every 30 seconds
    const intervalId = setInterval(fetchHealthData, 30000);
    
    return () => clearInterval(intervalId);
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>System Health | DentalDeals Admin</title>
        <meta name="description" content="System health monitoring dashboard for DentalDeals platform." />
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activeTab="health" onTabChange={() => {}} />
        
        <div className="flex-1 overflow-auto">
          <AdminHeader />
          
          <main className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">System Health Monitoring</h1>
              <p className="text-muted-foreground">Monitor application performance and system metrics</p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
                <span>Loading health metrics...</span>
              </div>
            ) : (
              <SystemHealthDashboard healthData={healthData} />
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default SystemHealth;
