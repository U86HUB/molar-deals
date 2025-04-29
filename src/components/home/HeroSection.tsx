
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  isAuthenticated: boolean;
  onOpenAuth: () => void;
}

export const HeroSection = ({ isAuthenticated, onOpenAuth }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          Exclusive Dental Deals
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          The Best Dental Deals, Delivered to Your Inbox
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect with top dental brands and access exclusive deals curated specifically for dental professionals like you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isAuthenticated ? (
            <Button size="lg" variant="primary" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          ) : (
            <Button size="lg" variant="primary" onClick={onOpenAuth}>
              Get Started Free
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={() => navigate("/how-it-works")}>
            See How It Works
          </Button>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Check className="text-primary mr-2 h-5 w-5" />
            No credit card required
          </div>
          <div className="flex items-center">
            <Check className="text-primary mr-2 h-5 w-5" />
            Free account option
          </div>
          <div className="flex items-center">
            <Check className="text-primary mr-2 h-5 w-5" />
            New deals every month
          </div>
        </div>
      </div>
    </section>
  );
};
