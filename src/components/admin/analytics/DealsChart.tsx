
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DealsChartProps {
  timeRange: string;
}

export const DealsChart = ({ timeRange }: DealsChartProps) => {
  // Mock data, in a real app this would be fetched based on timeRange
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
  
  // Filter based on time range if needed
  const chartData = timeRange === "month" ? 
    monthlyDeals.slice(-1) : 
    timeRange === "quarter" ? 
      monthlyDeals.slice(-3) : 
      monthlyDeals;
  
  const chartConfig = {
    deals: { label: "Regular Deals", color: "#6366f1" },
    premiumDeals: { label: "Premium Deals", color: "#8b5cf6" }
  };
  
  return (
    <ChartContainer config={chartConfig} className="aspect-[4/3]">
      <BarChart
        data={chartData}
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
  );
};
