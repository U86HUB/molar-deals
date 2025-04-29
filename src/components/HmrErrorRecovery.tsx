
import { useEffect, useState } from 'react';
import { toast } from "sonner";

/**
 * A component that monitors for HMR connection errors and provides recovery options
 */
const HmrErrorRecovery = () => {
  const [hasHmrError, setHasHmrError] = useState(false);
  
  useEffect(() => {
    // Listen for HMR connection errors
    const handleErrorEvent = (event: ErrorEvent) => {
      if (
        event.message.includes('WebSocket') || 
        event.message.includes('__WS_TOKEN__') || 
        event.message.includes('Vite HMR')
      ) {
        setHasHmrError(true);
        toast.error("Development server connection lost. Some updates may not be reflected.", {
          action: {
            label: "Reload",
            onClick: () => window.location.reload(),
          },
          duration: 10000,
        });
      }
    };
    
    // Add event listeners for error detection
    window.addEventListener('error', handleErrorEvent);
    
    return () => {
      window.removeEventListener('error', handleErrorEvent);
    };
  }, []);
  
  // Only render recovery UI when there's an error
  if (!hasHmrError) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-4 rounded-md shadow-lg">
      <p className="font-bold">Hot Module Reload Connection Error</p>
      <p className="text-sm">The development server connection is disrupted</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-100"
      >
        Reload Page
      </button>
    </div>
  );
};

export default HmrErrorRecovery;
