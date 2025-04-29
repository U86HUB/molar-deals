
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A component that monitors for HMR connection errors and provides recovery options
 */
const HmrErrorRecovery = () => {
  const [hasHmrError, setHasHmrError] = useState(false);
  
  useEffect(() => {
    // Function to handle errors in the global window context
    const handleErrorEvent = (event: ErrorEvent) => {
      // Check for HMR and WebSocket related errors
      if (
        event.message.includes('WebSocket') || 
        event.message.includes('__WS_TOKEN__') || 
        event.message.includes('Vite HMR')
      ) {
        console.warn('HMR connection issue detected:', event.message);
        setHasHmrError(true);
        
        // Show a toast notification that persists longer
        toast.error("Development server connection lost. Some updates may not be reflected.", {
          action: {
            label: "Reload",
            onClick: () => window.location.reload(),
          },
          duration: 10000, // Show for 10 seconds
        });
      }
    };
    
    // Specific handler for unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason && 
        ((typeof event.reason === 'string' && event.reason.includes('WebSocket')) ||
        (event.reason.message && event.reason.message.includes('__WS_TOKEN__')))
      ) {
        console.warn('HMR connection promise rejection:', event.reason);
        setHasHmrError(true);
      }
    };
    
    // Setup error event listeners
    window.addEventListener('error', handleErrorEvent);
    window.addEventListener('unhandledrejection', handleRejection);
    
    // Check for Vite client errors on initial load
    setTimeout(() => {
      // Check for any __WS_TOKEN__ errors in console by inspecting window errors
      const anyErrors = window.hasOwnProperty('__vite_error_overlay__') || 
                        document.querySelector('.vite-error-overlay');
      if (anyErrors) {
        setHasHmrError(true);
      }
    }, 1000);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('error', handleErrorEvent);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);
  
  // Only render recovery UI when there's an error
  if (!hasHmrError) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-red-600 text-white p-4 rounded-md shadow-lg max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-5 w-5" />
        <p className="font-bold">Hot Module Reload Connection Error</p>
      </div>
      <p className="text-sm mb-3">The development server connection is disrupted. You may need to reload the page to see new changes.</p>
      <div className="flex gap-2">
        <Button 
          onClick={() => window.location.reload()}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          Reload Page
        </Button>
        <Button 
          onClick={() => setHasHmrError(false)}
          variant="outline"
          size="sm"
          className="bg-transparent text-white border-white hover:bg-red-700"
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
};

export default HmrErrorRecovery;
