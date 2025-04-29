
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trackError } from '@/services/errorService';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Exchange the code for a session
        const { error } = await supabase.auth.getSession();
        if (error) throw error;

        // Redirect to dashboard on successful authentication
        toast.success("Successfully signed in!");
        navigate('/dashboard');
      } catch (error) {
        console.error('Error handling auth callback:', error);
        if (error instanceof Error) {
          trackError(error, 'AuthCallback');
        }
        toast.error("Authentication failed. Please try again.");
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Loader2 className="animate-spin h-8 w-8 text-primary mb-4" />
      <p className="text-muted-foreground">Finalizing authentication...</p>
    </div>
  );
};

export default AuthCallback;
