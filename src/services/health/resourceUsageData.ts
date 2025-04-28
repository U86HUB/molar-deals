
import { generateTimeSeriesData } from './mockDataGenerators';

/**
 * Generates resource usage data for CPU, memory, disk, and network
 */
export const generateResourceUsageData = () => {
  return {
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
  };
};
