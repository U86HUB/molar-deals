
// Mock data generators for system health monitoring

/**
 * Generates time series data for charts
 */
export const generateTimeSeriesData = (hours: number, valueFn: () => Record<string, unknown>) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`,
      ...valueFn()
    });
  }
  
  return data;
};

/**
 * Generates random system metrics data
 */
export const generateSystemMetrics = () => {
  return {
    uptime: 99.87,
    responseTime: Math.floor(Math.random() * 100) + 150, // 150-250ms
    errorRate: Math.random() * 2, // 0-2%
    successRate: 98.2 + Math.random(),
    trafficLevel: Math.floor(Math.random() * 30) + 70, // 70-100%
    cpuUsage: Math.floor(Math.random() * 40) + 20, // 20-60%
    memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
    diskUsage: Math.floor(Math.random() * 20) + 50, // 50-70%
  };
};

/**
 * Generates random service status data
 */
export const generateServiceStatus = () => {
  return [
    {
      id: "srv-1",
      name: "Authentication Service",
      status: "operational" as const,
      isEssential: true,
      latency: 87,
    },
    {
      id: "srv-2",
      name: "Payment Processing",
      status: "operational" as const,
      isEssential: true,
      latency: 210,
    },
    {
      id: "srv-3",
      name: "Database Cluster",
      status: "operational" as const,
      isEssential: true,
      latency: 32,
    },
    {
      id: "srv-4",
      name: "Search Service",
      status: Math.random() > 0.8 ? "degraded" as const : "operational" as const,
      isEssential: false,
      latency: 156,
    },
    {
      id: "srv-5",
      name: "Email Service",
      status: Math.random() > 0.95 ? "down" as const : "operational" as const,
      isEssential: false,
      latency: 310,
    },
    {
      id: "srv-6",
      name: "Storage Service",
      status: "operational" as const,
      isEssential: true,
      latency: 65,
    }
  ];
};

/**
 * Generates random endpoint data
 */
export const generateEndpointData = () => {
  return [
    {
      id: "ep-1",
      path: "/api/auth/login",
      method: "POST",
      success: 9870,
      failed: 42,
      avgResponseTime: 87,
      lastChecked: new Date().toISOString(),
    },
    {
      id: "ep-2",
      path: "/api/deals",
      method: "GET",
      success: 28450,
      failed: 131,
      avgResponseTime: 106,
      lastChecked: new Date().toISOString(),
    },
    {
      id: "ep-3",
      path: "/api/user/profile",
      method: "GET",
      success: 14320,
      failed: 57,
      avgResponseTime: 62,
      lastChecked: new Date().toISOString(),
    },
    {
      id: "ep-4",
      path: "/api/vendors",
      method: "GET",
      success: 8740,
      failed: 29,
      avgResponseTime: 128,
      lastChecked: new Date().toISOString(),
    },
    {
      id: "ep-5",
      path: "/api/payments/process",
      method: "POST",
      success: 3210,
      failed: 89,
      avgResponseTime: 245,
      lastChecked: new Date().toISOString(),
    }
  ];
};
