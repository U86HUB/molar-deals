
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { isProduction, logConfig } from '../config/environment';

/**
 * Initialize Sentry for error tracking
 */
export const setupGlobalErrorTracking = () => {
  if (isProduction && logConfig.enableErrorReporting) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 0.2,
      environment: import.meta.env.MODE,
      release: import.meta.env.APP_VERSION,
    });
    console.log("Sentry initialized for error tracking");
  } else {
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
export const captureMessage = (message: string, level: Sentry.SeverityLevel = Sentry.Severity.Error) => {
  if (isProduction && logConfig.enableErrorReporting) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`Message captured (but not sent to Sentry in development): ${message} (Level: ${level})`);
  }
};

export default {
  setupGlobalErrorTracking,
  logError,
  trackError,
  captureMessage,
};
