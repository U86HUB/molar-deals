
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

interface NetworkTrafficChartProps {
  networkData: { time: string; incoming: number; outgoing: number }[];
}

export function NetworkTrafficChart({ networkData }: NetworkTrafficChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Traffic</CardTitle>
        <CardDescription>Incoming and outgoing data</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer
          config={{
            incoming: { theme: { light: "#0ea5e9", dark: "#38bdf8" } },
            outgoing: { theme: { light: "#f97316", dark: "#fb923c" } }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={networkData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `${value} KB`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="incoming"
                stackId="1"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                name="incoming"
              />
              <Area
                type="monotone"
                dataKey="outgoing"
                stackId="1"
                stroke="#f97316"
                fill="#f97316"
                name="outgoing"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
