
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Lock, KeyRound, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SecuritySettingsCard = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [ipRestrictionEnabled, setIpRestrictionEnabled] = useState(false);
  const [passwordLastChanged, setPasswordLastChanged] = useState<string>("2 months ago");
  const [securityScore, setSecurityScore] = useState<number>(65);
  const [loading, setLoading] = useState(false);
  const [allowedIPs, setAllowedIPs] = useState<string>("");
  const [showIPInput, setShowIPInput] = useState(false);

  const handleSave = () => {
    setLoading(true);
    
    // Validate IP addresses if IP restriction is enabled
    if (ipRestrictionEnabled && allowedIPs) {
      const ipList = allowedIPs.split(',').map(ip => ip.trim());
      const validIpRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      
      const allValid = ipList.every(ip => validIpRegex.test(ip));
      if (!allValid) {
        toast.error("Please enter valid IP addresses (e.g., 192.168.1.1)");
        setLoading(false);
        return;
      }
    }

    // Simulate API call with secure headers
    setTimeout(() => {
      const newSecurityScore = calculateSecurityScore();
      setSecurityScore(newSecurityScore);
      setLoading(false);
      toast.success("Security settings saved successfully");
      
      // Store settings in session storage instead of localStorage for better security
      try {
        sessionStorage.setItem("securitySettings", JSON.stringify({
          twoFactorEnabled,
          ipRestrictionEnabled,
          allowedIPs: ipRestrictionEnabled ? allowedIPs : "",
          lastUpdated: new Date().toISOString()
        }));
      } catch (error) {
        console.error("Failed to save security settings to session storage", error);
      }
    }, 800);
  };

  const calculateSecurityScore = (): number => {
    let score = 50; // Base score
    if (twoFactorEnabled) score += 25;
    if (ipRestrictionEnabled) score += 15;
    if (allowedIPs.length > 0 && ipRestrictionEnabled) score += 10;
    return Math.min(score, 100);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          Security Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-secondary/30 p-3 rounded-md flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Security Score</p>
              <p className="text-xs text-muted-foreground">Last updated: Today</p>
            </div>
          </div>
          <div className={`text-lg font-bold ${securityScore > 80 ? "text-green-600" : securityScore > 60 ? "text-amber-600" : "text-red-600"}`}>
            {securityScore}/100
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Two-factor authentication
              </Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
              aria-label="Toggle two-factor authentication"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                IP restriction
              </Label>
              <p className="text-sm text-muted-foreground">
                Limit access to trusted IP addresses
              </p>
            </div>
            <Switch
              checked={ipRestrictionEnabled}
              onCheckedChange={(checked) => {
                setIpRestrictionEnabled(checked);
                setShowIPInput(checked);
              }}
              aria-label="Toggle IP restriction"
            />
          </div>

          {showIPInput && (
            <div className="pt-2 pl-6">
              <Label htmlFor="allowed-ips" className="text-sm">Allowed IP addresses (comma separated)</Label>
              <Input 
                id="allowed-ips" 
                placeholder="e.g., 192.168.1.1, 10.0.0.1" 
                value={allowedIPs}
                onChange={(e) => setAllowedIPs(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Only requests from these IPs will be allowed
              </p>
            </div>
          )}

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              Password last changed: <span className="font-medium">{passwordLastChanged}</span>
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} loading={loading}>
            Save Security Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
