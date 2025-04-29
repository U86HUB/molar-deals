
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ServerIcon, DatabaseIcon } from "lucide-react";

const SupabaseConfigInfo = () => {
  return (
    <div className="mt-8 space-y-4 p-4 border border-muted rounded-lg">
      <div className="flex items-center gap-2 text-primary font-medium">
        <InfoIcon className="h-5 w-5" />
        <h3>Authentication Troubleshooting</h3>
      </div>
      
      <Alert>
        <ServerIcon className="h-4 w-4" />
        <AlertTitle>Supabase URL Configuration</AlertTitle>
        <AlertDescription>
          <p className="mb-2">Make sure the following URLs are properly configured in the Supabase dashboard:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Site URL should match your application's URL</li>
            <li>Redirect URLs should include your auth callback path (e.g., <code>/auth/callback</code>)</li>
            <li>Local development URLs should include <code>localhost</code> if you're testing locally</li>
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Find these settings in the Supabase dashboard under: Authentication → URL Configuration
          </p>
        </AlertDescription>
      </Alert>
      
      <Alert>
        <DatabaseIcon className="h-4 w-4" />
        <AlertTitle>Database Error Solutions</AlertTitle>
        <AlertDescription>
          <p className="mb-2">If you see <code>"Database error finding user"</code>, check:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Verify the database is running in the Supabase dashboard</li>
            <li>Check if any database migrations are pending</li>
            <li>Ensure the auth schema tables have the correct permissions</li>
            <li>Try disabling "Confirm email" for testing purposes</li>
          </ul>
        </AlertDescription>
      </Alert>

      <p className="text-xs text-muted-foreground border-t pt-3 mt-3">
        Note: Database errors often require admin intervention in the Supabase dashboard.
        If you continue to experience issues, you may need to contact the system administrator.
      </p>
    </div>
  );
};

export default SupabaseConfigInfo;
