
// Import Sentry packages conditionally to avoid build errors
import { isProduction, logConfig } from '../config/environment';

// Define Sentry types
interface SentryType {
  init: (config: any) => void;
  captureException: (error: any, context?: any) => void;
  captureMessage: (message: string, level: SeverityLevel) => void;
}

// Define severity level enum
enum SeverityLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug'
}

// Create a mock Sentry object for non-production environments
const mockSentry: SentryType = {
  init: (config) => console.log("Mock Sentry initialized with:", config),
  captureException: (error, context) => console.error("Mock Sentry captureException:", error, context),
  captureMessage: (message, level) => console.log(`Mock Sentry captureMessage: ${message} (Level: ${level})`)
};

// Initialize Sentry - will be properly loaded only in production
let Sentry: SentryType = mockSentry;

// Only import Sentry in production to avoid build issues in development
if (isProduction && logConfig.enableErrorReporting) {
  try {
    // Use dynamic import but handle it properly for production
    import('@sentry/react').then((sentryModule) => {
      Sentry = sentryModule.default || sentryModule;
      
      // Initialize Sentry
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        tracesSampleRate: 0.2,
        environment: import.meta.env.MODE,
        release: import.meta.env.APP_VERSION || '1.0.0',
      });
      console.log("Sentry initialized for error tracking");
    }).catch(e => {
      console.warn("Failed to load Sentry:", e);
    });
  } catch (error) {
    console.warn("Sentry initialization error:", error);
  }
}

/**
 * Initialize Sentry for error tracking
 */
export const setupGlobalErrorTracking = () => {
  // Initialization is done above when the module is imported
  if (!isProduction || !logConfig.enableErrorReporting) {
    console.warn("Sentry not initialized: running in development or error reporting disabled");
  }
};

/**
 * Log an error message to the console (if enabled)
 * @param message - The error message to log
 */
export const logError = (message: string) => {
  if (logConfig.enableConsoleErrors) {
    console.error(message);
  }
};

/**
 * Capture an exception and send it to Sentry (if initialized)
 * @param error - The error object to capture
 * @param context - Optional context to provide additional information about the error
 */
export const trackError = (error: any, context?: any) => {
  if (isProduction && logConfig.enableErrorReporting) {
    Sentry.captureException(error, context);
  } else {
    console.error("Error captured (but not sent to Sentry in development):", error, context);
  }
};

/**
 * Capture a message and send it to Sentry (if initialized)
 * @param message - The message to capture
 * @param level - The severity level of the message
 */
export const captureMessage = (message: string, level: SeverityLevel = SeverityLevel.Error) => {
  if (isProduction && logConfig.enableErrorReporting) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`Message captured (but not sent to Sentry in development): ${message} (Level: ${level})`);
  }
};

// Export the SeverityLevel enum for use in other components
export { SeverityLevel };

// Export default object for convenience
export default {
  setupGlobalErrorTracking,
  logError,
  trackError,
  captureMessage,
  SeverityLevel
};
