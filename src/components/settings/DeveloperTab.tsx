
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthToggle } from "@/components/auth/AuthToggle";

export function DeveloperTab() {
  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Developer Options</h2>
        <p className="text-muted-foreground">
          These options are for development and testing purposes only
        </p>
      </CardHeader>
      
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Authentication Testing</CardTitle>
            <CardDescription>
              Enable mock authentication to bypass all authentication checks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthToggle />
            <p className="text-sm text-muted-foreground mt-4">
              With mock authentication enabled, you can access all protected routes without
              needing to sign in. Your user will have the "customer" role by default.
              This setting persists across page reloads.
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </div>
  );
}
