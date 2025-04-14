
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export function AccountTab() {
  return (
    <TabsContent value="account" className="m-0">
      <CardHeader>
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account security and preferences
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-base font-medium">Change Password</h3>
          <p className="text-sm text-muted-foreground">
            We'll send a password reset link to your email
          </p>
          <Button variant="outline">Send Reset Link</Button>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-base font-medium text-red-600 mb-2">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-100">Delete Account</Button>
        </div>
      </CardContent>
    </TabsContent>
  );
}
