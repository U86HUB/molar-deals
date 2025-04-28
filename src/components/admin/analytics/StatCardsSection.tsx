
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface StatCardsSectionProps {
  timeRange: string;
}

export const StatCardsSection = ({ timeRange }: StatCardsSectionProps) => {
  // In a real app, these would be fetched based on the timeRange
  const stats = {
    month: { deals: 210, revenue: 42800, vendors: 12, growth: 5.3 },
    quarter: { deals: 547, revenue: 108400, vendors: 31, growth: 8.1 },
    year: { deals: 863, revenue: 172400, vendors: 47, growth: 12.3 },
    all: { deals: 1254, revenue: 298600, vendors: 58, growth: 15.7 }
  };
  
  const currentStats = stats[timeRange as keyof typeof stats];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            Total Deals
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of deals created in the selected time period</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{currentStats.deals}</div>
          <p className="text-sm text-muted-foreground">+{currentStats.growth}% from previous period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            Revenue Generated
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total commission revenue from deals in the selected period</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${currentStats.revenue.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">+{(currentStats.growth - 2).toFixed(1)}% from previous period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            Active Vendors
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of vendors who published at least one deal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{currentStats.vendors}</div>
          <p className="text-sm text-muted-foreground">+{Math.round(currentStats.vendors * 0.1)} new vendors this period</p>
        </CardContent>
      </Card>
    </div>
  );
};
