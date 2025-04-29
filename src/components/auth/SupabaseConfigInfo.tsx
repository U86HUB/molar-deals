
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, ExternalLink } from "lucide-react";

const SupabaseConfigInfo = () => {
  return (
    <Alert className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <InfoIcon className="h-4 w-4 text-blue-500" />
      <AlertTitle>Important Configuration Note</AlertTitle>
      <AlertDescription className="text-sm space-y-2">
        <p>
          If you're experiencing authentication issues, please ensure your Supabase project is properly configured:
        </p>
        <ol className="list-decimal ml-5 space-y-1">
          <li>In Supabase Dashboard, go to Authentication &gt; URL Configuration</li>
          <li>Set your Site URL to match your application's URL exactly</li>
          <li>Add all relevant URLs to the Redirect URLs list:</li>
          <ul className="list-disc ml-5">
            <li>Your exact application URL</li>
            <li>Any preview URLs you may be using</li>
            <li>Any local development URLs (e.g., http://localhost:xxxx)</li>
          </ul>
          <li>Save your changes</li>
          <li>Clear your browser cache and try again</li>
        </ol>
        <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
          After updating Supabase settings, you may need to wait a few minutes for changes to take effect.
        </p>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => window.open('https://supabase.com/dashboard/project/fyyfrlhcvtxddonnkeoy/auth/url-configuration', '_blank')}
          >
            Open Supabase URL Configuration
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SupabaseConfigInfo;
