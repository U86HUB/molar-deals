
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { DealGrid } from "@/components/deals/DealGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Bell, Gift, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import type { DealProps } from "@/components/deals/DealCard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const userIsPremium = false; // In a real app, this would come from auth context
  
  // Mock data for deals
  const deals: DealProps[] = [
    {
      id: "1",
      title: "50% Off Professional Teeth Whitening Kit",
      description: "Get our professional-grade teeth whitening kit at half price. Includes LED accelerator and 3 whitening gel syringes.",
      brandName: "BrightSmile",
      brandLogo: "",
      discountValue: "50%",
      category: "Patient Care Products",
      expiryDate: "2025-06-15",
      isPremium: false,
      isNew: true,
      url: "https://example.com/deal/1"
    },
    {
      id: "2",
      title: "Buy One Get One Free: Premium Dental Impression Material",
      description: "Purchase our premium alginate impression material and get a second package free. Ideal for precise and detailed impressions.",
      brandName: "DentImpression",
      brandLogo: "",
      discountValue: "BOGO",
      category: "Dental Materials",
      expiryDate: "2025-05-20",
      isPremium: false,
      url: "https://example.com/deal/2"
    },
    {
      id: "3",
      title: "Exclusive: 35% Off Advanced Dental Laser System",
      description: "Take advantage of this limited-time offer on our state-of-the-art dental laser system. Includes free installation and 2-day training.",
      brandName: "LaserDent",
      brandLogo: "",
      discountValue: "35%",
      category: "Equipment",
      expiryDate: "2025-05-30",
      isPremium: true,
      url: "https://example.com/deal/3"
    },
    {
      id: "4",
      title: "Free Trial: Cloud-Based Practice Management Software",
      description: "Try our comprehensive dental practice management software free for 3 months. Includes patient records, billing, and appointment scheduling.",
      brandName: "DentCloud",
      brandLogo: "",
      discountValue: "Free Trial",
      category: "Software",
      expiryDate: "2025-07-01",
      isPremium: false,
      url: "https://example.com/deal/4"
    },
    {
      id: "5",
      title: "20% Off Continuing Education Courses",
      description: "Expand your knowledge with our accredited online dental continuing education courses at a special discount.",
      brandName: "DentalEdu",
      brandLogo: "",
      discountValue: "20%",
      category: "Continuing Education",
      expiryDate: "2025-06-10",
      isPremium: true,
      url: "https://example.com/deal/5"
    },
    {
      id: "6",
      title: "Special Bundle: Complete Orthodontic Kit",
      description: "Get our complete orthodontic starter kit including pliers, brackets, and wires at a bundled discount price.",
      brandName: "OrthoSupply",
      brandLogo: "",
      discountValue: "30%",
      category: "Orthodontic Products",
      expiryDate: "2025-05-25",
      isPremium: false,
      isNew: true,
      url: "https://example.com/deal/6"
    }
  ];
  
  // Filter deals based on active tab
  const filteredDeals = deals.filter(deal => {
    if (activeTab === "premium") return deal.isPremium;
    if (activeTab === "regular") return !deal.isPremium;
    return true; // "all" tab
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Deals Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Discover exclusive offers and savings for dental professionals
            </p>
          </div>
          
          {!userIsPremium && (
            <Button variant="success" className="md:self-end">
              <Star className="mr-2 h-4 w-4" />
              Upgrade to Premium
            </Button>
          )}
        </div>
        
        {/* Notification banner */}
        <div className="bg-accent rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="text-accent-foreground h-5 w-5 mr-3" />
            <p className="text-accent-foreground">
              <span className="font-medium">New deals available!</span> We've added 5 new deals this week.
            </p>
          </div>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
        
        {/* Featured section */}
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
        
        {/* Deals section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">Current Deals</h2>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full md:w-auto"
            >
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all">All Deals</TabsTrigger>
                <TabsTrigger value="regular">Regular</TabsTrigger>
                <TabsTrigger value="premium">
                  <Star className="mr-1 h-4 w-4" /> Premium
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            <DealGrid deals={filteredDeals} userIsPremium={userIsPremium} />
          </TabsContent>
        </section>
      </main>
    </div>
  );
};

// Required for the featured deal badge
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Dashboard;
