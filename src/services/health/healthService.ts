
import { generateSystemMetrics, generateServiceStatus, generateEndpointData } from './mockDataGenerators';
import { generateResourceUsageData } from './resourceUsageData';
import { generateSystemLogs } from './logsData';
import type { HealthData } from './types';

/**
 * Generates complete health monitoring data
 */
const getMockHealthData = (): HealthData => {
  return {
    metrics: generateSystemMetrics(),
    services: generateServiceStatus(),
    endpoints: generateEndpointData(),
    resources: generateResourceUsageData(),
    logs: generateSystemLogs()
  };
};

export const healthService = {
  getHealthMetrics: () => {
    // Simulate API delay
    return new Promise<HealthData>((resolve) => {
      setTimeout(() => {
        resolve(getMockHealthData());
      }, 800);
    });
  }
};
