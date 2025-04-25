
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Lock, KeyRound } from "lucide-react";

export const SecuritySettingsCard = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [ipRestrictionEnabled, setIpRestrictionEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Security settings saved successfully");
    }, 800);
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
              onCheckedChange={setIpRestrictionEnabled}
            />
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
