
/**
 * Generates mock system logs with various levels and messages
 */
export const generateSystemLogs = (count = 50) => {
  return Array.from({ length: count }, (_, i) => {
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
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
