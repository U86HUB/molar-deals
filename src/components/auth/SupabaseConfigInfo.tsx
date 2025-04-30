
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ServerIcon, DatabaseIcon, FileCode2, CheckCircle, ShieldIcon } from "lucide-react";

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

      <Alert>
        <ShieldIcon className="h-4 w-4" />
        <AlertTitle>PostGIS Security Configuration</AlertTitle>
        <AlertDescription>
          <p className="mb-2">The "must be owner" error for spatial_ref_sys can be resolved using one of these approaches:</p>
          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md my-2 text-xs">
            <p className="font-semibold mb-2">Option 1: Move PostGIS to its own schema (Recommended)</p>
            <pre className="whitespace-pre-wrap overflow-x-auto">
              {`-- Run these commands in Supabase SQL Editor:
CREATE SCHEMA IF NOT EXISTS extensions;
DROP EXTENSION IF EXISTS postgis CASCADE;
CREATE EXTENSION postgis WITH SCHEMA extensions;
ALTER DATABASE postgres SET search_path = public, extensions;`}
            </pre>
            <p className="mt-2 text-muted-foreground">This removes PostGIS tables from the public schema entirely.</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md my-2 text-xs">
            <p className="font-semibold mb-2">Option 2: Enable RLS on spatial_ref_sys</p>
            <pre className="whitespace-pre-wrap overflow-x-auto">
              {`-- Run these commands in Supabase SQL Editor:
ALTER TABLE public.spatial_ref_sys OWNER TO postgres;
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;
CREATE POLICY select_spatial_ref_sys ON public.spatial_ref_sys
  FOR SELECT USING (true);`}
            </pre>
            <p className="mt-2 text-muted-foreground">Only use this if you need specific access control to spatial_ref_sys.</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            These commands must be run as postgres superuser via the SQL Editor in the Supabase Dashboard.
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
