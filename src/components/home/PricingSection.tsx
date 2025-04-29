
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onOpenAuth: () => void;
}

export const PricingSection = ({ onOpenAuth }: PricingSectionProps) => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and start saving today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 max-w-4xl gap-8 mx-auto">
          {/* Free plan */}
          <div className="border rounded-xl p-8 bg-card">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-muted-foreground mb-6">Perfect for getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Access to regular deals</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Create your professional profile</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Participate in referral program</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" onClick={onOpenAuth}>
              Sign Up Free
            </Button>
          </div>
          
          {/* Premium plan */}
          <div className="border-2 border-primary rounded-xl p-8 bg-card relative">
            <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-xl">
              RECOMMENDED
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-muted-foreground mb-6">Unlock all premium features</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$19.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span><strong>All Free features, plus:</strong></span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Unlock all premium deals</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Early access to new deals</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Double referral bonuses</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Exclusive webinars & education</span>
              </li>
            </ul>
            <Button variant="primary" className="w-full" onClick={onOpenAuth}>
              Start Premium
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
