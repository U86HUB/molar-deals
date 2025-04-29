
/**
 * Environment configuration utilities for the application
 */

// Static environment detection
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
export const isTest = import.meta.env.MODE === 'test';

// App version from the package.json
export const appVersion = import.meta.env.PACKAGE_VERSION || '1.0.0';

// Base URL configuration
const getBaseUrl = (): string => {
  if (isProduction) {
    return window.location.origin;
  }
  return import.meta.env.VITE_APP_URL || window.location.origin;
};

export const baseUrl = getBaseUrl();

// Feature flags
interface FeatureFlags {
  enableSocialLogin: boolean;
  enableReferrals: boolean;
  enablePremiumFeatures: boolean;
  enableAnalytics: boolean;
  enableImageOptimization: boolean;
  // Add more feature flags as needed
}

export const featureFlags: FeatureFlags = {
  enableSocialLogin: true,
  enableReferrals: true,
  enablePremiumFeatures: isProduction, // Only enable in production
  enableAnalytics: isProduction,        // Only enable in production
  enableImageOptimization: true,
};

// Logging configuration
export const logConfig = {
  level: isProduction ? 'warn' : 'debug',
  enableConsoleLogging: !isProduction,
  enableRemoteLogging: isProduction,
};

// API timeouts
export const apiTimeouts = {
  default: 15000, // 15 seconds
  long: 30000,    // 30 seconds
  short: 5000,    // 5 seconds
};

// Caching strategies
export const cacheConfig = {
  defaultTTL: 5 * 60 * 1000, // 5 minutes in milliseconds
  longTTL: 60 * 60 * 1000,   // 1 hour in milliseconds
};
