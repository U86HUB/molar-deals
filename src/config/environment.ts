
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

// Supabase configuration
export const getSupabaseConfig = () => ({
  url: import.meta.env.VITE_SUPABASE_URL || 'https://fyyfrlhcvtxddonnkeoy.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5eWZybGhjdnR4ZGRvbm5rZW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjU5ODMsImV4cCI6MjA2MTQ0MTk4M30.SOZTo0frLpPY3L0wN2ljV8Axqryct1nkh4CUpotGZz4'
});

// Check if HMR should be enabled (development only)
export const shouldEnableHmr = isDevelopment;

// Log configuration for error tracking
export const logConfig = {
  enableConsoleErrors: isDevelopment,
  enableErrorReporting: isProduction,
  enableRemoteLogging: isProduction
};
