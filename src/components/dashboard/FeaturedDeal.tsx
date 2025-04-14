
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FeaturedDeal = () => {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <Badge className="bg-primary text-white mb-3">Featured Deal</Badge>
            <h2 className="text-2xl font-bold mb-2">
              Early Access: Next-Gen Intraoral Scanner
            </h2>
            <p className="text-muted-foreground mb-4">
              Be among the first to try our revolutionary intraoral scanner with 
              AI-powered diagnostics and get 40% off the retail price. Limited availability.
            </p>
            <Button variant="primary">
              Learn more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center">
              <Gift className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
