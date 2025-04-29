
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ServerIcon, DatabaseIcon, FileCode2, CheckCircle } from "lucide-react";

const SupabaseConfigInfo = () => {
  return (
    <div className="mt-8 space-y-4 p-4 border border-muted rounded-lg">
      <div className="flex items-center gap-2 text-primary font-medium">
        <InfoIcon className="h-5 w-5" />
        <h3>Authentication Troubleshooting</h3>
      </div>
      
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle>Migration Complete</AlertTitle>
        <AlertDescription>
          <p className="mb-2">You've successfully run the required database migrations! Authentication should now work properly.</p>
        </AlertDescription>
      </Alert>
      
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
        <FileCode2 className="h-4 w-4" />
        <AlertTitle>Optional: Email Confirmation</AlertTitle>
        <AlertDescription>
          <p className="mb-2">For development purposes, you may want to disable email confirmation:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Go to the Supabase dashboard</li>
            <li>Navigate to Authentication → Email</li>
            <li>Uncheck "Confirm email" to skip verification during development</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            Note: Re-enable this for production to maintain security
          </p>
        </AlertDescription>
      </Alert>

      <p className="text-xs text-muted-foreground border-t pt-3 mt-3">
        Now that migrations have been applied successfully, your authentication system should work properly.
        If you continue to experience issues, you may need to contact Supabase support.
      </p>
    </div>
  );
};

export default SupabaseConfigInfo;
