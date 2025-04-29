
/**
 * Environment configuration helper
 */

// Check if we're in production mode
export const isProduction = import.meta.env.PROD;

// Check if we're in development mode
export const isDevelopment = import.meta.env.DEV;

// Check if we're in test mode
export const isTest = import.meta.env.MODE === 'test';

// Get the current base URL for API calls
export const getBaseUrl = () => {
  if (isProduction) {
    return window.location.origin;
  }
  return 'http://localhost:8080';
};

// Check if HMR should be enabled (development only)
export const shouldEnableHmr = isDevelopment;

// Log configuration for error tracking
export const logConfig = {
  enableConsoleErrors: isDevelopment,
  enableErrorReporting: isProduction
};
