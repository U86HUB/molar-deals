
import { supabase } from "@/integrations/supabase/client";

interface ErrorData {
  message: string;
  stack?: string;
  componentName?: string;
  userId?: string;
  path?: string;
  timestamp?: string;
}

export async function trackError(error: Error, componentName?: string) {
  try {
    // Get current user if available
    const { data: { session } } = await supabase.auth.getSession();
    
    // Create error data object
    const errorData: ErrorData = {
      message: error.message,
      stack: error.stack,
      componentName,
      userId: session?.user?.id,
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    
    // Send error to edge function
    const { error: fnError } = await supabase.functions.invoke('track-error', {
      body: { error: errorData }
    });
    
    if (fnError) {
      console.error('Error tracking failed:', fnError);
    }
    
    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
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
}
