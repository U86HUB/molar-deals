
import type { ResourceUsage } from "@/services/health";
import { 
  CpuUsageChart, 
  MemoryUsageChart, 
  DiskUsageChart, 
  NetworkTrafficChart 
} from "./charts";
import { 
  transformCpuData, 
  transformMemoryData, 
  transformDiskData, 
  transformNetworkData 
} from "./utils/resourceDataTransformers";

interface ResourceUsageChartsProps {
  resourceData: ResourceUsage;
}

export function ResourceUsageCharts({ resourceData }: ResourceUsageChartsProps) {
  // Transform the data for each chart
  const cpuData = transformCpuData(resourceData.cpuHistory);
  const memoryData = transformMemoryData(resourceData.memoryHistory);
  const diskData = transformDiskData(resourceData.diskUsage);
  const networkData = transformNetworkData(resourceData.networkTraffic);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <CpuUsageChart cpuData={cpuData} />
        <MemoryUsageChart memoryData={memoryData} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DiskUsageChart diskData={diskData} />
        <NetworkTrafficChart networkData={networkData} />
      </div>
    </div>
  );
}
