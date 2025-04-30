
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
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
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for analytics
const monthlyDeals = [
  { name: 'Jan', deals: 65, premiumDeals: 28, revenue: 12400 },
  { name: 'Feb', deals: 59, premiumDeals: 24, revenue: 11200 },
  { name: 'Mar', deals: 80, premiumDeals: 35, revenue: 15800 },
  { name: 'Apr', deals: 81, premiumDeals: 40, revenue: 16900 },
  { name: 'May', deals: 56, premiumDeals: 25, revenue: 10800 },
  { name: 'Jun', deals: 55, premiumDeals: 22, revenue: 9700 },
  { name: 'Jul', deals: 40, premiumDeals: 18, revenue: 7600 },
  { name: 'Aug', deals: 70, premiumDeals: 32, revenue: 13400 },
  { name: 'Sep', deals: 78, premiumDeals: 38, revenue: 15200 },
  { name: 'Oct', deals: 85, premiumDeals: 42, revenue: 17600 },
  { name: 'Nov', deals: 92, premiumDeals: 48, revenue: 19300 },
  { name: 'Dec', deals: 102, premiumDeals: 55, revenue: 21800 }
];

const categoryData = [
  { name: 'Equipment', value: 35, color: '#8b5cf6' },
  { name: 'Consumables', value: 25, color: '#6366f1' },
  { name: 'Instruments', value: 20, color: '#d946ef' },
  { name: 'Software', value: 10, color: '#0ea5e9' },
  { name: 'Services', value: 10, color: '#f97316' }
];

const userDemographics = [
  { subject: 'Dentists', A: 80, fullMark: 100 },
  { subject: 'Specialists', A: 60, fullMark: 100 },
  { subject: 'Hygienists', A: 30, fullMark: 100 },
  { subject: 'Students', A: 50, fullMark: 100 },
  { subject: 'Clinics', A: 65, fullMark: 100 }
];

const chartConfig = {
  deals: { label: "Regular Deals", color: "#6366f1" },
  premiumDeals: { label: "Premium Deals", color: "#8b5cf6" },
  revenue: { label: "Revenue ($)", color: "#0ea5e9" }
};

const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">863</div>
            <p className="text-sm text-muted-foreground">+12.3% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenue Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$172,400</div>
            <p className="text-sm text-muted-foreground">+8.1% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-sm text-muted-foreground">+4 new vendors this month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Monthly Deals Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-[4/3]">
              <BarChart
                data={monthlyDeals}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="deals" fill="#6366f1" name="Regular Deals" />
                <Bar dataKey="premiumDeals" fill="#8b5cf6" name="Premium Deals" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-[4/3]">
              <LineChart
                data={monthlyDeals}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" name="Revenue ($)" activeDot={{ r: 8 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Deal Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userDemographics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="User Distribution" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
