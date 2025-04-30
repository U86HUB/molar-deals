
import { AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export const MockAuthBanner = () => {
  const [visible, setVisible] = useState(false);
  const [useMockAuth, setUseMockAuth] = useState(false);
  
  useEffect(() => {
    const checkMockAuth = () => {
      const mockAuthEnabled = localStorage.getItem("useMockAuth") === "true";
      setUseMockAuth(mockAuthEnabled);
      setVisible(mockAuthEnabled);
    };
    
    checkMockAuth();
    
    // Listen for storage changes to update banner visibility
    window.addEventListener("storage", checkMockAuth);
    return () => {
      window.removeEventListener("storage", checkMockAuth);
    };
  }, []);
  
  if (!visible || !useMockAuth) return null;
  
  return (
    <div className="bg-yellow-500 text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span className="font-medium">
          Mock Authentication Enabled - All authentication checks are bypassed
        </span>
      </div>
      <button onClick={() => setVisible(false)} className="text-white">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};
