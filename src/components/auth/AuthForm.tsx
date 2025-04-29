
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import ConnectionStatus from "@/components/auth/ConnectionStatus";

// Email schema with validation
const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface AuthFormProps {
  onSuccess: (email: string) => void;
  onRetry: () => void;
  error: string | null;
}

const AuthForm = ({ onSuccess, onRetry, error }: AuthFormProps) => {
  const { signInWithOtp } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showConnectionStatus, setShowConnectionStatus] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  // Monitor network status changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show connection status if there's an error
  useEffect(() => {
    if (error && (error.toLowerCase().includes("fetch") || 
        error?.toLowerCase().includes("network") ||
        error?.toLowerCase().includes("connection"))) {
      setShowConnectionStatus(true);
    }
    
    setLocalError(error);
  }, [error]);
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (values: EmailFormValues) => {
    setSubmitting(true);
    setLocalError(null);
    
    try {
      // Check network connectivity first with visual feedback
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.");
      }
      
      await signInWithOtp(values.email);
      onSuccess(values.email);
    } catch (error) {
      // Error handling is done at the parent component level
      console.log("Login error caught in AuthForm:", error);
      // Show connection status if it looks like a network error
      if (error instanceof Error) {
        setLocalError(error.message);
        
        if (error.message.includes("fetch") || 
           error.message.includes("network") ||
           error.message.includes("connection")) {
          setShowConnectionStatus(true);
        }
        
        // Show Supabase configuration guidance for database errors
        if (error.message.includes("Database error") || error.message.includes("authentication setup")) {
          setLocalError(
            "There appears to be an issue with the Supabase configuration. This might require admin attention. " +
            "Possible solutions:\n" +
            "1. Verify the Supabase project is active and the database is running\n" +
            "2. Check if there are any pending migrations\n" +
            "3. Ensure proper URL configuration in Supabase Auth settings"
          );
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Show connection status component when needed
  if (showConnectionStatus) {
    return (
      <>
        <ConnectionStatus onRetry={onRetry} />
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full"
          onClick={() => setShowConnectionStatus(false)}
        >
          Back to Login Form
        </Button>
      </>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    autoComplete="email"
                    disabled={submitting}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Magic Link...
            </>
          ) : (
            "Send Magic Link"
          )}
        </Button>
        
        {(localError || error) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription className="space-y-2">
              <p className="whitespace-pre-line">{localError || error}</p>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onRetry}
                >
                  Try Again
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowConnectionStatus(true)}
                >
                  Check Connection
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
