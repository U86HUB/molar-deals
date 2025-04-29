
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check for the 'access_token' URL parameter on component mount
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });
      
      if (error) throw error;
      
      setSuccess(true);
      toast.success("Password updated successfully!");
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/auth", { replace: true });
      }, 3000);
      
    } catch (error: any) {
      setError(error.message || "Failed to update password");
      toast.error(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Password Reset Error</CardTitle>
            <CardDescription className="text-red-500 flex items-center justify-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Invalid or expired reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">The password reset link is invalid or has expired.</p>
            <Button 
              onClick={() => navigate("/auth")} 
              className="mt-4"
              variant="primary"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
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
        </div>
        
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>Create a new password for your account</CardDescription>
          </CardHeader>
          
          {success ? (
            <CardContent className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p className="font-medium text-lg">Password Reset Successfully</p>
              <p className="text-muted-foreground">
                Your password has been updated. You'll be redirected to login shortly.
              </p>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="New Password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="Confirm New Password"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    {error}
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting Password...
                    </>
                  ) : "Reset Password"}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
