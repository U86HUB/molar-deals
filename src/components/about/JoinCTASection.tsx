
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

interface JoinCTASectionProps {}

const JoinCTASection: FC<JoinCTASectionProps> = () => {
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        <Users className="h-16 w-16 mx-auto mb-6 text-white/80" />
        <h2 className="text-3xl font-bold mb-6">Join Our Growing Team</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          We're always looking for talented individuals who share our passion for innovation and helping dental professionals succeed.
        </p>
        <Link to="/careers">
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
          >
            View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default JoinCTASection;
