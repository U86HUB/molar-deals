
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Battery, BatteryMedium, ChartBar, Signal } from "lucide-react";

interface SystemMetricsOverviewProps {
  metrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    successRate: number;
    trafficLevel: number;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  };
}

export function SystemMetricsOverview({ metrics }: SystemMetricsOverviewProps) {
  // Helper function to determine color based on value
  const getHealthColor = (value: number, isErrorRate = false) => {
    if (isErrorRate) {
      return value > 5 ? "text-red-500" : value > 2 ? "text-amber-500" : "text-green-500";
    }
    return value > 80 ? "text-green-500" : value > 50 ? "text-amber-500" : "text-red-500";
  };
  
  const getProgressColor = (value: number, inverse = false) => {
    if (inverse) {
      return value > 80 ? "bg-red-500" : value > 50 ? "bg-amber-500" : "bg-green-500";
    }
    return value > 80 ? "bg-green-500" : value > 50 ? "bg-amber-500" : "bg-red-500";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          <Signal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.uptime.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
          <Progress 
            value={metrics.uptime} 
            className={`mt-2 h-2 ${getProgressColor(metrics.uptime)}`}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          <ChartBar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.responseTime} ms</div>
          <p className="text-xs text-muted-foreground">Average</p>
          <Progress 
            value={100 - (metrics.responseTime / 10)} 
            className={`mt-2 h-2 ${getProgressColor(100 - (metrics.responseTime / 10))}`}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          <Battery className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getHealthColor(metrics.errorRate, true)}`}>
            {metrics.errorRate.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
          <Progress 
            value={metrics.errorRate * 5} 
            className={`mt-2 h-2 ${getProgressColor(100 - (metrics.errorRate * 20), true)}`}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Load</CardTitle>
          <BatteryMedium className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.cpuUsage}% CPU</div>
          <p className="text-xs text-muted-foreground">{metrics.memoryUsage}% Memory Usage</p>
          <Progress 
            value={metrics.cpuUsage} 
            className={`mt-2 h-2 ${getProgressColor(100 - metrics.cpuUsage, true)}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
