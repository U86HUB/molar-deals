import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { AuthModal } from "@/components/auth/AuthModal";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { Check, Star, Users, Package, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { CookieSettingsButton } from "@/components/common/CookieSettingsButton";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isAuthenticated, user, session, hasCompletedOnboarding } = useAuth();
  const navigate = useNavigate();

  // Check if user needs onboarding when auth state changes
  useEffect(() => {
    if (isAuthenticated && user && session) {
      // Check if user has completed onboarding (from metadata)
      if (hasCompletedOnboarding === false) {
        // Show onboarding if not completed
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
      }
    } else {
      // If not authenticated, make sure onboarding is hidden
      setShowOnboarding(false);
    }
  }, [isAuthenticated, user, session, hasCompletedOnboarding]);

  const handleAuthSuccess = () => {
    // We'll show onboarding after auth callback handles
    // the user session and redirects back to here
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate("/dashboard");
  };
  
  const handleHowItWorksClick = () => {
    navigate("/how-it-works");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => setShowAuthModal(true)} />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      
      <OnboardingWizard 
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onClose={() => setShowOnboarding(false)}
      />
      
      {/* Hero */}
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
              <Button size="lg" variant="primary" onClick={() => setShowAuthModal(true)}>
                Get Started Free
              </Button>
            )}
            <Button size="lg" variant="outline" onClick={handleHowItWorksClick}>
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
      
      {/* Trusted by */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">
            Trusted by thousands of dental professionals and brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['DentistBrand', 'ToothCare', 'OralTech', 'SmileCorp', 'DentalEquip'].map((brand) => (
              <div key={brand} className="text-gray-400 font-semibold text-xl">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
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
      
      {/* How it works */}
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
      
      {/* Pricing */}
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
              <Button variant="outline" className="w-full" onClick={() => setShowAuthModal(true)}>
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
              <Button variant="primary" className="w-full" onClick={() => setShowAuthModal(true)}>
                Start Premium
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
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
            onClick={() => setShowAuthModal(true)}
          >
            Create Your Free Account 
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <section className="bg-secondary py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link to="/brands" className="text-muted-foreground hover:text-foreground">Brand Partners</Link></li>
                <li><Link to="/press" className="text-muted-foreground hover:text-foreground">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                <li><Link to="/webinars" className="text-muted-foreground hover:text-foreground">Webinars</Link></li>
                <li><Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">Dental Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><CookieSettingsButton /></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                <li><a href="https://twitter.com/dentaldeals" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://linkedin.com/company/dentaldeals" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://instagram.com/dentaldeals" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">DD</span>
              </div>
              <span className="text-lg font-bold">DentalDeals</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2025 DentalDeals. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Features data
const features = [
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
    icon: Check
  }
];

// Steps data
const steps = [
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

export default Index;
