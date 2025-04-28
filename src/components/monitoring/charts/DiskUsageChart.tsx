
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend
} from "recharts";
import type { DiskUsageItem } from "@/services/health";

interface DiskUsageChartProps {
  diskData: { name: string; used: number; free: number }[];
}

export function DiskUsageChart({ diskData }: DiskUsageChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disk Usage</CardTitle>
        <CardDescription>Storage allocation by volume</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer
          config={{
            used: { theme: { light: "#ef4444", dark: "#f87171" } },
            free: { theme: { light: "#10b981", dark: "#34d399" } }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={diskData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="used" stackId="a" fill="#ef4444" name="used" />
              <Bar dataKey="free" stackId="a" fill="#10b981" name="free" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
