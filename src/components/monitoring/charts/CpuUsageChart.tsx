
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import type { TimeSeriesDataPoint } from "@/services/health";

interface CpuUsageChartProps {
  cpuData: { time: string; usage: number }[];
}

export function CpuUsageChart({ cpuData }: CpuUsageChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU Utilization</CardTitle>
        <CardDescription>Average usage over time</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer 
          config={{
            cpu: { theme: { light: "#2563eb", dark: "#3b82f6" } },
            threshold: { theme: { light: "#ef4444", dark: "#f87171" } }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cpuData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorCpu)"
                name="cpu"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
