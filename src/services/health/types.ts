
// Type definitions for health monitoring data

export type ServiceStatus = "operational" | "degraded" | "down";

export interface SystemMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  successRate: number;
  trafficLevel: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export interface ServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
  isEssential: boolean;
  latency: number;
}

export interface EndpointHealth {
  id: string;
  path: string;
  method: string;
  success: number;
  failed: number;
  avgResponseTime: number;
  lastChecked: string;
}

export interface TimeSeriesDataPoint {
  time: string;
  usage?: number;
  incoming?: number;
  outgoing?: number;
  [key: string]: unknown;
}

export interface DiskUsageItem {
  name: string;
  used: number;
  total: number;
}

export interface ResourceUsage {
  cpuHistory: TimeSeriesDataPoint[];
  memoryHistory: TimeSeriesDataPoint[];
  diskUsage: DiskUsageItem[];
  networkTraffic: TimeSeriesDataPoint[];
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  service: string;
  message: string;
  details?: string;
}

export interface HealthData {
  metrics: SystemMetrics;
  services: ServiceHealth[];
  endpoints: EndpointHealth[];
  resources: ResourceUsage;
  logs: SystemLog[];
}
