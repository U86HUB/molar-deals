
import { Star, Users, Package } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export const FeaturesSection = () => {
  const features: Feature[] = [
    {
      title: "Exclusive Offers",
      description: "Access special discounts and offers not available anywhere else, negotiated directly with top dental brands.",
      icon: Star
    },
    {
      title: "Personalized Deals",
      description: "We tailor deals to your specialty and preferences so you only see what's relevant to your practice.",
      icon: Users
    },
    {
      title: "Monthly Goodie Bag",
      description: "Every month, receive a fresh collection of curated deals across various categories of dental products and services.",
      icon: Package
    },
    {
      title: "Premium Content",
      description: "Upgrade for access to premium deals with bigger discounts and early access to limited-time offers.",
      icon: Star
    },
    {
      title: "Referral Rewards",
      description: "Earn credits and bonuses by inviting colleagues to join the platform. Both you and your referrals benefit.",
      icon: Users
    },
    {
      title: "Easy Redemption",
      description: "One-click access to claim deals. No complicated forms or lengthy processes to slow you down.",
      icon: Package
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need in One Place</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We curate the best deals from top dental brands so you can focus on what matters most.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
