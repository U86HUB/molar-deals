
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const { signInWithOtp, isLoading, isAuthenticated, user, hasSetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  // Check if the user needs to set a password
  useEffect(() => {
    if (isAuthenticated && !hasSetPassword) {
      navigate("/settings?tab=account&setup=password");
    } else if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, hasSetPassword, navigate, from]);

  // Email schema with validation
  const emailSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
  });

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof emailSchema>) => {
    setSubmitting(true);
    setError(null);
    
    try {
      // Check network connectivity
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.");
      }
      
      await signInWithOtp(values.email);
      setOtpSent(true);
      setEmail(values.email);
    } catch (error: any) {
      console.error("Auth error:", error);
      const errorMessage = error?.message || "Failed to send magic link. Please try again later.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    form.handleSubmit(handleLogin)();
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">DD</span>
          </div>
          <h1 className="text-3xl font-bold">DentalDeals</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access exclusive dental deals
          </p>
        </div>
        
        <Card className="w-full">
          {otpSent ? (
            <CardHeader>
              <CardTitle>Check your email</CardTitle>
              <CardDescription>
                We've sent a one-time login link to {email}
              </CardDescription>
            </CardHeader>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Sign in with a magic link</CardTitle>
                <CardDescription>
                  Enter your email to receive a one-time password
                </CardDescription>
              </CardHeader>
              
              {error && (
                <CardContent className="pt-0 pb-4">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </CardContent>
              )}
              
              <CardContent>
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
                  </form>
                </Form>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex items-center w-full justify-center text-sm text-muted-foreground gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>We'll email you a magic link for a password-free sign in</span>
                </div>
                
                {error && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={handleRetry}
                  >
                    Try Again
                  </Button>
                )}
              </CardFooter>
            </>
          )}
        </Card>
        
        {otpSent && (
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setOtpSent(false)}
              className="text-sm"
            >
              Use a different email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
