
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, AlertCircle, WifiOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

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
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (values: EmailFormValues) => {
    setSubmitting(true);
    
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
    } finally {
      setSubmitting(false);
    }
  };

  // Display offline warning if not connected
  if (!isOnline) {
    return (
      <Alert variant="destructive" className="mb-4">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>You're offline</AlertTitle>
        <AlertDescription>
          Please check your internet connection and try again.
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </AlertDescription>
      </Alert>
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
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>{error}</p>
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
