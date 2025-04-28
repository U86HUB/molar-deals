
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, ChevronRight } from "lucide-react";

const HowItWorks = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>How It Works | DentalDeals</title>
        <meta name="description" content="Learn how DentalDeals connects dental professionals with exclusive offers and deals." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How DentalDeals Works</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We connect dental professionals with the best deals from top brands, making equipment and supply purchases more affordable.
            </p>
          </div>
        </section>
        
        {/* Process Steps */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
                  <div className="h-14 w-14 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mb-5">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <ChevronRight className="h-10 w-10 text-primary/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Benefits of Using DentalDeals</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Premium Plan */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4">Upgrade to Premium</h2>
                <p className="text-xl mb-6">
                  Take your savings to the next level with our Premium membership.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Unlock all premium deals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Early access to new offers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Double referral bonuses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Exclusive webinars & resources</span>
                  </li>
                </ul>
                
                <Button variant="primary" size="lg" onClick={handleOpenAuth}>
                  Get Premium <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$19.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Join thousands of dental professionals who are saving more with our Premium plan.
                </p>
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg mb-6">
                  <div>
                    <span className="block font-medium">Average monthly savings</span>
                    <span className="text-primary font-bold text-2xl">$475</span>
                  </div>
                  <div>
                    <span className="block font-medium">ROI</span>
                    <span className="text-primary font-bold text-2xl">24x</span>
                  </div>
                </div>
                <Button variant="primary" className="w-full" onClick={handleOpenAuth}>
                  Start Premium Now
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg mb-4">Still have questions?</p>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
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
              onClick={handleOpenAuth}
            >
              Create Your Free Account 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        {/* Footer - Reuse the same footer from Index.tsx */}
        <footer className="bg-secondary py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                  <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                  <li><Link to="/brands" className="text-muted-foreground hover:text-foreground">Brand Partners</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Press</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                  <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                  <li><Link to="/webinars" className="text-muted-foreground hover:text-foreground">Webinars</Link></li>
                  <li><Link to="/resources" className="text-muted-foreground hover:text-foreground">Dental Resources</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Settings</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">LinkedIn</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
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
        </footer>
      </div>
    </>
  );
};

// Step data
const steps = [
  {
    title: "Create Your Free Account",
    description: "Sign up in under a minute with your email or connect with your Google or Apple account."
  },
  {
    title: "Browse Exclusive Deals",
    description: "Explore our curated collection of deals from top dental brands, tailored to your practice needs."
  },
  {
    title: "Redeem & Save",
    description: "Click to redeem deals and save hundreds on your dental supplies and equipment purchases."
  }
];

// Benefits data
const benefits = [
  {
    title: "Significant Cost Savings",
    description: "Our members save an average of 23% on dental supplies and equipment through our exclusive deals."
  },
  {
    title: "Curated Quality Products",
    description: "We partner only with trusted, high-quality brands in the dental industry."
  },
  {
    title: "Time Efficiency",
    description: "Stop searching for deals across multiple websites. We bring all the best offers to one dashboard."
  },
  {
    title: "Referral Rewards",
    description: "Earn credits and points by referring colleagues to join DentalDeals."
  },
  {
    title: "Continuous New Offers",
    description: "Fresh deals added weekly to ensure you always have access to the latest savings."
  },
  {
    title: "Premium Educational Content",
    description: "Access webinars and resources to stay updated on industry trends and best practices."
  }
];

// FAQ data
const faqs = [
  {
    question: "Is DentalDeals free to use?",
    answer: "Yes, we offer a free basic membership that gives you access to regular deals. For access to premium deals and additional benefits, we offer an affordable subscription plan."
  },
  {
    question: "How do I redeem deals?",
    answer: "Once you're logged in, simply browse available deals and click the 'Redeem' button. You'll receive a unique code or link to use on the vendor's website or during checkout."
  },
  {
    question: "Are these offers exclusive to DentalDeals?",
    answer: "Yes, most of our deals are negotiated exclusively for our members and cannot be found elsewhere."
  },
  {
    question: "How often are new deals added?",
    answer: "We add new deals weekly, with a major refresh of all offerings at the beginning of each month."
  },
  {
    question: "Can I suggest brands I'd like to see deals from?",
    answer: "Absolutely! We welcome suggestions from our community. Please use the 'Suggest a Brand' feature in your dashboard."
  }
];

export default HowItWorks;
