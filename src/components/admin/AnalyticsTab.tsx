
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ChartBarBig,
  ChartPie,
  Download,
  FileSpreadsheet,
  TrendingUp
} from "lucide-react";
import { StatCardsSection } from "./analytics/StatCardsSection";
import { DealsChart } from "./analytics/DealsChart";
import { RevenueChart } from "./analytics/RevenueChart";
import { CategoryDistributionChart } from "./analytics/CategoryDistributionChart";
import { DemographicsChart } from "./analytics/DemographicsChart";
import { AnalyticsReportGenerator } from "./analytics/AnalyticsReportGenerator";

const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [showReportGenerator, setShowReportGenerator] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
        
        <div className="flex items-center gap-3">
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            onClick={() => setShowReportGenerator(!showReportGenerator)}
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            {showReportGenerator ? "Hide Reports" : "Generate Reports"}
          </Button>
        </div>
      </div>
      
      {showReportGenerator && (
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <AnalyticsReportGenerator timeRange={timeRange} />
          </CardContent>
        </Card>
      )}
      
      <StatCardsSection timeRange={timeRange} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBarBig className="h-5 w-5 text-primary" />
              Monthly Deals Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DealsChart timeRange={timeRange} />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="h-5 w-5 text-primary" />
              Deal Categories Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryDistributionChart timeRange={timeRange} />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBarBig className="h-5 w-5 text-primary" />
              User Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DemographicsChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
