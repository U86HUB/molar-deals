
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, ArrowRight } from "lucide-react";

const Brands = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>Our Brand Partners | DentalDeals</title>
        <meta name="description" content="Discover our trusted dental brand partners offering exclusive deals on DentalDeals." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Brand Partners</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We collaborate with leading brands in the dental industry to bring you exclusive deals and special offers.
            </p>
          </div>
        </section>
        
        {/* Featured Brands */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Brand Partners</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBrands.map((brand, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                    <div className="text-2xl font-bold text-gray-500">{brand.name} Logo</div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{brand.name}</h3>
                      {brand.featured && (
                        <Badge variant="secondary">Featured Partner</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{brand.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < brand.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{brand.reviewCount} reviews</span>
                    </div>
                    <Button variant="outline" className="w-full">View Deals</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* All Brands */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">All Partner Brands</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {allBrands.map((brand, index) => (
                <div key={index} className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold text-gray-500">{brand.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{brand.category}</p>
                  <Badge variant={brand.dealCount > 5 ? "secondary" : "outline"} className="text-xs">
                    {brand.dealCount} {brand.dealCount === 1 ? 'deal' : 'deals'}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Brands
              </Button>
            </div>
          </div>
        </section>
        
        {/* Become a Partner */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4">Become a Brand Partner</h2>
                <p className="text-xl mb-6">
                  Join our marketplace and connect with thousands of dental professionals looking for quality products and services.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Access to our growing network of dental professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Easy-to-use vendor dashboard to manage your offers</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Detailed analytics and performance tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Flexible pricing and commission structure</span>
                  </li>
                </ul>
                
                <Link to="/vendor">
                  <Button variant="primary" size="lg">
                    Partner With Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Partner Benefits</h3>
                
                <div className="space-y-4">
                  {partnerBenefits.map((benefit, index) => (
                    <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link to="/vendor">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Partners Say</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-gray-500">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Explore Deals?</h2>
            <p className="text-xl mb-8 opacity-90">
              Create your account today and start saving on products from our trusted brand partners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleOpenAuth}
              >
                Sign Up Now
              </Button>
              <Link to="/vendor">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Become a Partner
                </Button>
              </Link>
            </div>
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

// Featured brands data
const featuredBrands = [
  {
    name: "DentalTech Pro",
    description: "Leading provider of advanced dental equipment and technology solutions for modern practices.",
    rating: 5,
    reviewCount: 124,
    featured: true
  },
  {
    name: "OralCare Plus",
    description: "Premium dental hygiene products and preventive care solutions for dental professionals.",
    rating: 4,
    reviewCount: 98,
    featured: true
  },
  {
    name: "SurgicalSmiles",
    description: "Specialized surgical tools and equipment for oral surgeries and complex dental procedures.",
    rating: 5,
    reviewCount: 87,
    featured: false
  },
  {
    name: "DentaSupply Co",
    description: "Comprehensive range of dental supplies for everyday practice needs at competitive prices.",
    rating: 4,
    reviewCount: 156,
    featured: true
  },
  {
    name: "ImplantMasters",
    description: "Advanced implant systems and restorative components with industry-leading success rates.",
    rating: 5,
    reviewCount: 72,
    featured: false
  },
  {
    name: "OrthoEssentials",
    description: "Complete orthodontic solutions from brackets and wires to patient education materials.",
    rating: 4,
    reviewCount: 63,
    featured: true
  }
];

// All brands data
const allBrands = [
  { name: "AeroDent", category: "Equipment", dealCount: 8 },
  { name: "BestSmile", category: "Orthodontics", dealCount: 5 },
  { name: "ClearVision", category: "Imaging", dealCount: 3 },
  { name: "DentalTech Pro", category: "Equipment", dealCount: 12 },
  { name: "EndoSpecialists", category: "Endodontics", dealCount: 4 },
  { name: "FlossDaily", category: "Preventive", dealCount: 6 },
  { name: "GumCare", category: "Periodontics", dealCount: 2 },
  { name: "HygienePro", category: "Supplies", dealCount: 7 },
  { name: "ImplantMasters", category: "Implantology", dealCount: 9 },
  { name: "JawFit", category: "Orthodontics", dealCount: 3 },
  { name: "KidSmiles", category: "Pediatric", dealCount: 5 },
  { name: "LaserDent", category: "Technology", dealCount: 4 },
  { name: "MolarMax", category: "Restorative", dealCount: 8 },
  { name: "NovoCeram", category: "Prosthodontics", dealCount: 6 },
  { name: "OralCare Plus", category: "Preventive", dealCount: 10 },
  { name: "PerfectCrown", category: "Prosthodontics", dealCount: 3 }
];

// Partner benefits
const partnerBenefits = [
  {
    title: "Increased Brand Visibility",
    description: "Showcase your brand to our targeted audience of dental professionals actively looking for supplies and equipment."
  },
  {
    title: "Direct Sales Opportunities",
    description: "Convert interested professionals directly into customers through our streamlined deal redemption process."
  },
  {
    title: "Market Insights & Analytics",
    description: "Gain valuable data on how dental professionals interact with your products and offers."
  },
  {
    title: "Flexible Partnership Models",
    description: "Choose from various partnership options to find the right fit for your business goals and budget."
  }
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "DentalTech Pro",
    quote: "Partnering with DentalDeals has significantly increased our market reach. We've seen a 40% increase in new customer acquisition since joining the platform."
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "OralCare Plus",
    quote: "The quality of leads we get through DentalDeals is exceptional. These are serious dental professionals who are ready to purchase, not just window shoppers."
  },
  {
    name: "Emily Rodriguez",
    role: "Sales Manager",
    company: "ImplantMasters",
    quote: "The DentalDeals team has been incredibly supportive throughout our partnership. Their platform has become an essential part of our sales strategy."
  },
  {
    name: "David Kim",
    role: "VP of Business Development",
    company: "SurgicalSmiles",
    quote: "The vendor dashboard provides valuable insights that help us optimize our offers. It's like having an extra marketing team working for us."
  }
];

export default Brands;
