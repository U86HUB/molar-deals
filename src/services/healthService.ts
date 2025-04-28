
// Mock data for system health monitoring
// In a real application, this would be replaced with actual API calls to backend services

// Helper to generate random time series data
const generateTimeSeriesData = (hours: number, valueFn: () => any) => {
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

// Generate the mock health data
const getMockHealthData = () => {
  return {
    metrics: {
      uptime: 99.87,
      responseTime: Math.floor(Math.random() * 100) + 150, // 150-250ms
      errorRate: Math.random() * 2, // 0-2%
      successRate: 98.2 + Math.random(),
      trafficLevel: Math.floor(Math.random() * 30) + 70, // 70-100%
      cpuUsage: Math.floor(Math.random() * 40) + 20, // 20-60%
      memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
      diskUsage: Math.floor(Math.random() * 20) + 50, // 50-70%
    },
    services: [
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
    ],
    endpoints: [
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
    ],
    resources: {
      cpuHistory: generateTimeSeriesData(24, () => ({ 
        usage: Math.floor(Math.random() * 40) + 20 
      })),
      memoryHistory: generateTimeSeriesData(24, () => ({ 
        usage: Math.floor(Math.random() * 30) + 40 
      })),
      diskUsage: [
        { name: "System", used: 128, total: 256 },
        { name: "Data", used: 512, total: 1024 },
        { name: "Backup", used: 128, total: 512 },
        { name: "Logs", used: 32, total: 128 }
      ],
      networkTraffic: generateTimeSeriesData(24, () => ({
        incoming: Math.floor(Math.random() * 800) + 200,
        outgoing: Math.floor(Math.random() * 500) + 100
      }))
    },
    logs: Array.from({ length: 50 }, (_, i) => {
      const levels = ["info", "warn", "error", "debug"] as const;
      const levelIndex = Math.floor(Math.random() * 10);
      // Weight towards info logs
      const level = levelIndex < 5 ? "info" : levels[levelIndex % 4];
      
      const services = ["api", "auth", "database", "payment", "email", "worker"];
      const service = services[Math.floor(Math.random() * services.length)];
      
      const timeOffset = Math.floor(Math.random() * 60 * 24); // Random time in last 24 hours
      const timestamp = new Date(Date.now() - timeOffset * 60 * 1000).toISOString();
      
      const messages = {
        info: [
          "Request processed successfully",
          "User login successful",
          "Payment processed",
          "Email sent to user",
          "Cache refreshed",
          "Background job completed"
        ],
        warn: [
          "High memory usage detected",
          "API rate limit approaching",
          "Slow query detected",
          "Retry attempt for failed operation",
          "Deprecated API endpoint accessed"
        ],
        error: [
          "Database connection failed",
          "Payment processing error",
          "Authentication failed",
          "Email delivery failed",
          "Service timeout"
        ],
        debug: [
          "Processing request parameters",
          "Query execution plan",
          "Cache hit status",
          "Authentication token details",
          "API response payload"
        ]
      };
      
      const message = messages[level][Math.floor(Math.random() * messages[level].length)];
      
      // Add details for some logs
      let details;
      if (level === "error" || level === "debug" || (Math.random() > 0.7)) {
        if (level === "error") {
          details = `Error: ECONNREFUSED\nStack trace:\n  at Socket.<anonymous> (node:net:1377:14)\n  at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1467:10)`;
        } else if (level === "debug") {
          details = `{"requestId":"req-${Math.random().toString(36).substring(2, 10)}","params":{"userId":"usr-${Math.random().toString(36).substring(2, 10)}","action":"view"}}`;
        } else {
          details = `Operation took ${Math.floor(Math.random() * 1000)}ms to complete`;
        }
      }
      
      return {
        id: `log-${i}`,
        timestamp,
        level,
        service,
        message,
        details
      };
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  };
};

export const healthService = {
  getHealthMetrics: () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockHealthData());
      }, 800);
    });
  }
};
