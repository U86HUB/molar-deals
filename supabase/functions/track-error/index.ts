
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

interface ErrorData {
  message: string;
  stack?: string;
  componentName?: string;
  userId?: string;
  path?: string;
  timestamp: string;
}

interface RequestBody {
  error: ErrorData;
}

serve(async (req) => {
  // Extract the JWT token from the request
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  // Create a Supabase client with the Auth admin token
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  );
  
  try {
    // Parse the request body
    const { error: errorData } = await req.json() as RequestBody;
    
    console.error(`ERROR TRACKED: ${errorData.message} | User: ${errorData.userId || 'anonymous'} | Path: ${errorData.path}`);
    
    // In a production environment, you would:
    // 1. Store in database
    // 2. Send to external error tracking service like Sentry
    // 3. Maybe send critical alerts via email/slack
    
    // For now, we'll just log it to the edge function logs which you can view in the Supabase dashboard
    
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to process error tracking" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
