
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AuthToggle = () => {
  const [useMockAuth, setUseMockAuth] = useState<boolean>(
    localStorage.getItem("useMockAuth") === "true"
  );

  useEffect(() => {
    // Save the preference to localStorage
    localStorage.setItem("useMockAuth", String(useMockAuth));
    
    // Show a message that page reload is needed
    if (useMockAuth !== (localStorage.getItem("useMockAuth") === "true")) {
      // Only show if changed
      alert("Please reload the page for the authentication mode to take effect.");
    }
  }, [useMockAuth]);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Switch
          id="mock-auth"
          checked={useMockAuth}
          onCheckedChange={setUseMockAuth}
        />
        <Label htmlFor="mock-auth" className="cursor-pointer">
          Use Mock Authentication
        </Label>
      </div>
      
      {useMockAuth && (
        <Alert variant="warning" className="bg-yellow-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Mock authentication is enabled. All authentication checks are bypassed
            and you have full access to the app. This mode is for testing only.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
