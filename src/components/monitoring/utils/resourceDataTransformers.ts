
import type { ResourceUsage, TimeSeriesDataPoint, DiskUsageItem } from "@/services/health";

/**
 * Transforms CPU usage data from the API format to chart-compatible format
 */
export const transformCpuData = (cpuHistory: TimeSeriesDataPoint[]) => {
  return cpuHistory.map(item => ({
    time: item.time,
    usage: item.usage as number,
  }));
};

/**
 * Transforms memory usage data from the API format to chart-compatible format
 */
export const transformMemoryData = (memoryHistory: TimeSeriesDataPoint[]) => {
  return memoryHistory.map(item => ({
    time: item.time,
    usage: item.usage as number,
  }));
};

/**
 * Transforms disk usage data to include percentage values
 */
export const transformDiskData = (diskUsage: DiskUsageItem[]) => {
  return diskUsage.map(item => ({
    name: item.name,
    used: parseFloat(((item.used / item.total) * 100).toFixed(1)),
    free: parseFloat((100 - ((item.used / item.total) * 100)).toFixed(1)),
  }));
};

/**
 * Transforms network traffic data from the API format to chart-compatible format
 */
export const transformNetworkData = (networkTraffic: TimeSeriesDataPoint[]) => {
  return networkTraffic.map(item => ({
    time: item.time,
    incoming: item.incoming as number,
    outgoing: item.outgoing as number,
  }));
};
