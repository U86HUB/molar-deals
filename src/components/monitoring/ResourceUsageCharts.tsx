
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
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import type { ResourceUsage, TimeSeriesDataPoint, DiskUsageItem } from "@/services/health";

interface ResourceUsageChartsProps {
  resourceData: ResourceUsage;
}

export function ResourceUsageCharts({ resourceData }: ResourceUsageChartsProps) {
  // Process disk usage data to get percentages
  const diskData = resourceData.diskUsage.map((item: DiskUsageItem) => ({
    name: item.name,
    used: parseFloat(((item.used / item.total) * 100).toFixed(1)),
    free: parseFloat((100 - ((item.used / item.total) * 100)).toFixed(1)),
  }));

  // Process CPU and memory data for the charts
  const cpuData = resourceData.cpuHistory.map((item: TimeSeriesDataPoint) => ({
    time: item.time,
    usage: item.usage as number,
  }));

  const memoryData = resourceData.memoryHistory.map((item: TimeSeriesDataPoint) => ({
    time: item.time,
    usage: item.usage as number,
  }));

  // Process network traffic data
  const networkData = resourceData.networkTraffic.map((item: TimeSeriesDataPoint) => ({
    time: item.time,
    incoming: item.incoming as number,
    outgoing: item.outgoing as number,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
            <CardDescription>System memory utilization</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                memory: { theme: { light: "#8b5cf6", dark: "#a78bfa" } },
                threshold: { theme: { light: "#ef4444", dark: "#f87171" } }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={memoryData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorMemory)"
                    name="memory"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
      </div>
    </div>
  );
}
