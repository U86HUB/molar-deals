
import { Button } from "@/components/ui/button";

interface EmailSentProps {
  email: string;
  onBack: () => void;
}

const EmailSent = ({ email, onBack }: EmailSentProps) => {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Check your email</h2>
        <p className="text-muted-foreground mt-2">
          We've sent a one-time login link to {email}. The link will expire in 15 minutes.
        </p>
      </div>
      
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-sm"
      >
        Use a different email
      </Button>
    </>
  );
};

export default EmailSent;
