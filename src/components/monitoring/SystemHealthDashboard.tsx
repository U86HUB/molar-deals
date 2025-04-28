
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemMetricsOverview } from "./SystemMetricsOverview";
import { ApiHealthStatus } from "./ApiHealthStatus";
import { ResourceUsageCharts } from "./ResourceUsageCharts";
import { LogsViewer } from "./LogsViewer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Clock, RefreshCw } from "lucide-react";

interface SystemHealthDashboardProps {
  healthData: any;
}

export function SystemHealthDashboard({ healthData }: SystemHealthDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // System health status calculation
  const criticalServices = healthData?.services.filter((s: any) => s.isEssential);
  const criticalIssues = criticalServices?.filter((s: any) => s.status !== "operational").length;
  
  const overallStatus = criticalIssues > 0 ? "degraded" : "healthy";

  const refreshData = () => {
    toast("Refreshing health metrics...");
    // In a real app, this would trigger an API call
    setLastUpdated(new Date());
    
    // Mock success message
    setTimeout(() => {
      toast.success("Health metrics refreshed");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge 
            variant={overallStatus === "healthy" ? "default" : "destructive"} 
            className="text-sm px-2 py-1"
          >
            {overallStatus === "healthy" ? "All Systems Operational" : "System Degraded"}
          </Badge>
          
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
        
        <Button onClick={refreshData} size="sm" className="shrink-0">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Metrics
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API Health</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <SystemMetricsOverview metrics={healthData?.metrics} />
        </TabsContent>
        
        <TabsContent value="api">
          <ApiHealthStatus services={healthData?.services} endpoints={healthData?.endpoints} />
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourceUsageCharts resourceData={healthData?.resources} />
        </TabsContent>
        
        <TabsContent value="logs">
          <LogsViewer logs={healthData?.logs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
