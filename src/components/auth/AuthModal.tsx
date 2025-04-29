
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const { signInWithOtp } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (values: z.infer<typeof emailSchema>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Check network connectivity first
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.");
      }
      
      await signInWithOtp(values.email);
      setOtpSent(true);
      setEmail(values.email);
      toast.success("Magic link sent! Please check your email.");
    } catch (error: any) {
      console.error("Auth error:", error);
      const errorMessage = error?.message || "Failed to send magic link. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (otpSent) {
      onSuccess();
    }
    setOtpSent(false);
    setEmail("");
    setError(null);
    form.reset();
    onClose();
  };

  const handleRetry = () => {
    setError(null);
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            {otpSent ? "Check your email" : "Welcome to DentalDeals"}
          </DialogTitle>
        </DialogHeader>

        {error && !otpSent && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription className="mt-2">
              {error}
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 w-full"
                onClick={handleRetry}
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {otpSent ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <p className="text-md">
              We've sent a magic link to <span className="font-medium">{email}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Click the link in the email to sign in to your account
            </p>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className="pl-10"
                            autoComplete="email"
                            disabled={loading}
                          />
                        </FormControl>
                      </div>
                      <FormDescription className="text-xs text-center">
                        We'll email you a magic link for password-free sign in
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Magic Link...
                    </>
                  ) : (
                    "Continue with Email"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
