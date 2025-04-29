
interface Step {
  title: string;
  description: string;
}

export const HowItWorksSection = () => {
  const steps: Step[] = [
    {
      title: "Create Your Account",
      description: "Sign up for free with your email or connect with your Google or Apple account."
    },
    {
      title: "Complete Your Profile",
      description: "Tell us about your specialty and preferences so we can curate deals just for you."
    },
    {
      title: "Browse & Redeem Deals",
      description: "Access your dashboard to view available deals and click to redeem your favorites."
    }
  ];

  return (
    <section className="py-20 bg-secondary/50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started with DentalDeals is easy. Follow these simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="h-14 w-14 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-6">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
