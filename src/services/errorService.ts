
import { supabase } from "@/integrations/supabase/client";
import { isProduction, isDevelopment, logConfig } from "@/config/environment";

interface ErrorData {
  message: string;
  stack?: string;
  componentName?: string;
  userId?: string;
  path?: string;
  timestamp?: string;
  environment?: string;
  version?: string;
  browserInfo?: string;
}

export async function trackError(error: Error, componentName?: string) {
  try {
    // Skip detailed tracking in development if configured
    if (isDevelopment && !logConfig.enableRemoteLogging) {
      console.error('Error in', componentName || 'unknown component', error);
      return;
    }
    
    // Get current user if available
    const { data: { session } } = await supabase.auth.getSession();
    
    // Get browser and environment information
    const browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    };
    
    // Create error data object
    const errorData: ErrorData = {
      message: error.message,
      stack: error.stack,
      componentName,
      userId: session?.user?.id,
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
      environment: isProduction ? 'production' : 'development',
      version: import.meta.env.PACKAGE_VERSION || 'unknown',
      browserInfo: JSON.stringify(browserInfo)
    };
    
    // Send error to edge function
    const { error: fnError } = await supabase.functions.invoke('track-error', {
      body: { error: errorData }
    });
    
    if (fnError) {
      console.error('Error tracking failed:', fnError);
    }
    
    // Also log to console in development
    if (isDevelopment) {
      console.error('Error tracked:', errorData);
    }
  } catch (trackingError) {
    // Fallback to console if tracking fails
    console.error('Error tracking service failed:', trackingError);
    console.error('Original error:', error);
  }
}

// Global error handler to catch unhandled errors
export function setupGlobalErrorTracking() {
  window.addEventListener('error', (event) => {
    trackError(event.error || new Error(event.message));
    // Don't prevent default - let the browser handle it normally too
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    trackError(error, 'UnhandledPromiseRejection');
  });
  
  // Add performance monitoring
  if (isProduction && 'performance' in window && 'PerformanceObserver' in window) {
    try {
      // Monitor long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Track tasks longer than 100ms
          if (entry.duration > 100) {
            console.warn(`Long task detected: ${entry.duration}ms`, entry);
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      
      // Monitor navigation timing
      if (performance.getEntriesByType) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navEntry && navEntry.domComplete > 3000) {
              // Track slow loading times (over 3 seconds)
              console.warn(`Slow page load: ${navEntry.domComplete}ms`);
            }
          }, 0);
        });
      }
    } catch (err) {
      console.error('Error setting up performance monitoring:', err);
    }
  }
}

// Add a function to track feature usage
export function trackFeatureUsage(featureName: string, metadata?: Record<string, any>) {
  try {
    if (isProduction || logConfig.enableRemoteLogging) {
      supabase.functions.invoke('track-feature-usage', {
        body: { 
          feature: featureName,
          metadata,
          timestamp: new Date().toISOString()
        }
      }).catch((error) => {
        console.error('Failed to track feature usage:', error);
      });
    }
  } catch (error) {
    console.error('Error tracking feature usage:', error);
  }
}
