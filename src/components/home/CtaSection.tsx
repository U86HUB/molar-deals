
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CtaSectionProps {
  onOpenAuth: () => void;
}

export const CtaSection = ({ onOpenAuth }: CtaSectionProps) => {
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Saving?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of dental professionals discovering exclusive deals every month.
        </p>
        <Button 
          variant="secondary" 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90"
          onClick={onOpenAuth}
        >
          Create Your Free Account 
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
