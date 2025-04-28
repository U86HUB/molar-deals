
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface RevenueChartProps {
  timeRange: string;
}

export const RevenueChart = ({ timeRange }: RevenueChartProps) => {
  // Mock data, in a real app this would be fetched based on timeRange
  const monthlyRevenue = [
    { name: 'Jan', revenue: 12400, projected: 12400 },
    { name: 'Feb', revenue: 11200, projected: 12600 },
    { name: 'Mar', revenue: 15800, projected: 13000 },
    { name: 'Apr', revenue: 16900, projected: 13400 },
    { name: 'May', revenue: 10800, projected: 13800 },
    { name: 'Jun', revenue: 9700, projected: 14200 },
    { name: 'Jul', revenue: 7600, projected: 14600 },
    { name: 'Aug', revenue: 13400, projected: 15000 },
    { name: 'Sep', revenue: 15200, projected: 15400 },
    { name: 'Oct', revenue: 17600, projected: 15800 },
    { name: 'Nov', revenue: 19300, projected: 16200 },
    { name: 'Dec', revenue: 21800, projected: 16600 }
  ];
  
  // Filter based on time range if needed
  const chartData = timeRange === "month" ? 
    monthlyRevenue.slice(-1) : 
    timeRange === "quarter" ? 
      monthlyRevenue.slice(-3) : 
      monthlyRevenue;
      
  const chartConfig = {
    revenue: { label: "Revenue ($)", color: "#0ea5e9" },
    projected: { label: "Projected ($)", color: "#d946ef" }
  };
  
  return (
    <ChartContainer config={chartConfig} className="aspect-[4/3]">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="projected" 
          stroke="#d946ef" 
          strokeDasharray="5 5" 
          fill="#d946ef" 
          fillOpacity={0.1} 
          name="Projected ($)" 
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#0ea5e9" 
          fill="#0ea5e9" 
          fillOpacity={0.3} 
          name="Revenue ($)" 
        />
      </AreaChart>
    </ChartContainer>
  );
};
