
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  FileText,
  ShoppingBag,
  CreditCard,
  UserCircle,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";

const HelpCenter = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(category => 
    searchQuery === "" || 
    category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Helmet>
        <title>Help Center | DentalDeals</title>
        <meta name="description" content="Find answers to frequently asked questions, get support, and learn how to make the most of DentalDeals." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help?</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for answers..." 
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>
        
        {/* Help Categories */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Browse Help Topics</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {helpCategories.map((category, index) => (
                <div key={index} className="bg-white p-6 text-center rounded-xl shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            {searchQuery && filteredFaqs.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any FAQs matching "{searchQuery}".
                  Try a different search or contact our support team.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
              </div>
            ) : (
              <>
                {filteredFaqs.map((category, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                    <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                          <AccordionTrigger className="px-6 hover:no-underline">
                            <span className="text-left font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </>
            )}
            
            <div className="mt-12 text-center">
              <p className="text-lg mb-4">Still have questions?</p>
              <Button variant="primary" className="flex items-center">
                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact Options */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  Monday-Friday, 9am-5pm ET
                </p>
                <p className="text-lg font-medium">(800) 555-1234</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">
                  We'll respond within 24 hours
                </p>
                <p className="text-lg font-medium">support@dentaldeals.com</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <MessageSquare className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-4">
                  Available for Premium members
                </p>
                <Button variant="outline">Start Chat</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Help Center Resources */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Additional Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex bg-secondary/20 p-6 rounded-xl">
                <div className="mr-6">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">User Guides</h3>
                  <p className="text-muted-foreground mb-4">
                    Step-by-step guides to help you make the most of DentalDeals.
                  </p>
                  <Button variant="outline">Browse Guides</Button>
                </div>
              </div>
              
              <div className="flex bg-secondary/20 p-6 rounded-xl">
                <div className="mr-6">
                  <HelpCircle className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
                  <p className="text-muted-foreground mb-4">
                    Watch helpful tutorials on navigating the platform and redeeming deals.
                  </p>
                  <Button variant="outline">Watch Videos</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer - Reuse the same footer from other pages */}
        <footer className="bg-secondary py-12 px-4">
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

// Help categories data
const helpCategories = [
  {
    title: "Getting Started",
    description: "New to DentalDeals? Learn the basics here.",
    icon: FileText
  },
  {
    title: "Deals & Redemption",
    description: "How to find and redeem the best deals.",
    icon: ShoppingBag
  },
  {
    title: "Account & Billing",
    description: "Manage your account and subscription.",
    icon: UserCircle
  },
  {
    title: "Payment Issues",
    description: "Resolve problems with payments.",
    icon: CreditCard
  }
];

// FAQs data
const faqs = [
  {
    category: "Account & Registration",
    questions: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click the 'Sign Up' button in the top-right corner of the homepage. You'll need to provide your email address, create a password, and verify that you're a dental professional."
      },
      {
        question: "Is DentalDeals only for dental professionals?",
        answer: "Yes, DentalDeals is exclusively for verified dental professionals, including dentists, dental specialists, hygienists, and dental office managers. We verify credentials during the registration process."
      },
      {
        question: "How do you verify my credentials?",
        answer: "During registration, we ask for your professional license number or dental office information. Our team verifies this information against professional databases before approving your account."
      },
      {
        question: "Can I have multiple users under one practice account?",
        answer: "Yes, with our Premium plan, you can add up to 5 team members to your practice account. Each user will have their own login credentials but will be linked to the main practice account."
      }
    ]
  },
  {
    category: "Deals & Redemption",
    questions: [
      {
        question: "How do I redeem a deal?",
        answer: "To redeem a deal, click on the deal card to view details, then click the 'Redeem Now' button. Depending on the deal, you'll either receive a unique code to use at checkout on the vendor's website or be directed to a special landing page with the discount already applied."
      },
      {
        question: "Are there limits on how many deals I can redeem?",
        answer: "With a free account, you can redeem up to 3 deals per month. Premium members have unlimited redemptions. Some specific deals may have their own quantity limitations set by vendors."
      },
      {
        question: "What happens if I have an issue with a purchased product?",
        answer: "For product issues, contact the vendor directly using the information provided in your order confirmation. If you need additional assistance, our support team can help facilitate communication with the vendor."
      },
      {
        question: "How long do deals last?",
        answer: "Deal durations vary. Some are available for months, while others are limited-time offers. The expiration date is always clearly displayed on each deal card and detail page."
      }
    ]
  },
  {
    category: "Membership & Billing",
    questions: [
      {
        question: "What's the difference between free and Premium memberships?",
        answer: "Free members can access basic deals and redeem up to 3 per month. Premium members get access to exclusive deals, unlimited redemptions, early access to new offers, priority support, and educational resources."
      },
      {
        question: "How much does a Premium membership cost?",
        answer: "Premium membership is $19.99 per month, or $199 per year (saving you about 17% compared to monthly billing)."
      },
      {
        question: "How do I cancel my Premium membership?",
        answer: "You can cancel your Premium membership at any time from the 'Subscription' tab in your account settings. Your Premium benefits will continue until the end of your current billing period."
      },
      {
        question: "Is there a refund policy?",
        answer: "We offer a 14-day money-back guarantee for new Premium subscriptions. If you're not satisfied, contact our support team within 14 days of your initial purchase for a full refund."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "The website isn't loading properly. What should I do?",
        answer: "First, try clearing your browser cache and cookies. If that doesn't work, try using a different browser. If issues persist, contact our support team with details about the problem and screenshots if possible."
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click on 'Login' and then 'Forgot Password' on the login screen. Enter your email address, and we'll send you instructions to reset your password."
      },
      {
        question: "Can I use DentalDeals on my mobile device?",
        answer: "Yes, DentalDeals is fully responsive and works on all modern mobile devices. We also have iOS and Android apps available for download from the App Store and Google Play Store."
      },
      {
        question: "How do I update my practice information?",
        answer: "Log in to your account, go to 'Settings', and select the 'Practice Information' tab. From there, you can update all your practice details."
      }
    ]
  }
];

export default HelpCenter;
