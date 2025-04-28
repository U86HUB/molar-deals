
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ArrowRight, ExternalLink, Download } from "lucide-react";

const Press = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>Press & Media | DentalDeals</title>
        <meta name="description" content="DentalDeals press room - Find press releases, media kit, company news, and contact information for media inquiries." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Press & Media</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Latest news, press releases, and resources for media coverage about DentalDeals.
            </p>
          </div>
        </section>
        
        {/* Press Releases */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Press Releases</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center mb-2">
                    <Badge variant={release.featured ? "default" : "outline"} className="mr-2">
                      {release.featured ? "Featured" : "Press Release"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{release.title}</h3>
                  <p className="text-gray-600 mb-4">{release.excerpt}</p>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <span>Read More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* In The News */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-8">DentalDeals In The News</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {newsArticles.map((article, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <Newspaper className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">{article.source}</span>
                      <span className="text-sm text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline text-sm"
                    >
                      <span>Read Article</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Media Kit */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center bg-secondary/30 rounded-xl overflow-hidden">
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold mb-4">Media Kit</h2>
                <p className="text-gray-600 mb-6">
                  Download our media kit for the latest company information, logos, executive photos, and brand guidelines.
                </p>
                <Button variant="primary" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Media Kit</span>
                </Button>
              </div>
              <div className="md:w-1/2 bg-gray-100 h-64 flex items-center justify-center">
                <div className="text-gray-400 font-medium">Media Kit Preview</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Company Facts */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-8">Company Facts</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">About DentalDeals</h3>
                <p className="text-gray-600 mb-4">
                  DentalDeals is the leading marketplace connecting dental professionals with exclusive offers on equipment and supplies from top brands. Our platform helps dental practices save money while maintaining quality care.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Founded</span>
                    <span>2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Headquarters</span>
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Employees</span>
                    <span>45+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Brand Partners</span>
                    <span>140+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Active Users</span>
                    <span>12,000+</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">By The Numbers</h3>
                <div className="space-y-6">
                  {companyStats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Media Contacts */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Media Contacts</h2>
                <p className="text-gray-600 mb-8">
                  For press inquiries, interview requests, or additional information, please contact our media relations team.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Press Inquiries</h3>
                    <p className="text-primary">press@dentaldeals.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Interview Requests</h3>
                    <p className="text-primary">media@dentaldeals.com</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Media Assets</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-3">Available Resources</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                      <span>Company logos (various formats)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                      <span>Executive headshots</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                      <span>Product screenshots</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                      <span>Brand guidelines</span>
                    </li>
                    <li className="flex items-center">
                      <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                      <span>Official photography</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Access Media Assets</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to our press list to receive the latest news and updates from DentalDeals.
            </p>
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 rounded-md px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Subscribe
                </Button>
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

// Press releases data
const pressReleases = [
  {
    title: "DentalDeals Secures $12M Series A to Expand Dental Supply Marketplace",
    excerpt: "Funding will accelerate product development and grow the company's network of brand partners to provide more cost-saving opportunities for dental professionals.",
    date: "April 10, 2025",
    featured: true
  },
  {
    title: "DentalDeals Partners with Top 5 Dental Equipment Manufacturers to Offer Exclusive Deals",
    excerpt: "New strategic partnerships will bring unprecedented savings on premium dental equipment to platform members.",
    date: "March 15, 2025",
    featured: false
  },
  {
    title: "DentalDeals Launches Premium Subscription with Enhanced Benefits for Dental Practices",
    excerpt: "New subscription tier offers deeper discounts, early access to limited-time offers, and exclusive educational content.",
    date: "February 28, 2025",
    featured: false
  }
];

// News articles data
const newsArticles = [
  {
    title: "How DentalDeals is Disrupting the Dental Supply Industry",
    excerpt: "The startup is bringing transparency and competitive pricing to an industry long dominated by a few key players...",
    source: "TechCrunch",
    date: "April 5, 2025",
    url: "#"
  },
  {
    title: "Dental Professionals Save an Average of 23% Through New Online Marketplace",
    excerpt: "A case study of how DentalDeals is changing purchasing habits across the dental industry...",
    source: "Dental Economics",
    date: "March 22, 2025",
    url: "#"
  },
  {
    title: "DentalDeals Named Among 'Top 10 Healthcare Startups to Watch'",
    excerpt: "The company's innovative approach to helping dental practices reduce overhead costs earns recognition...",
    source: "Forbes",
    date: "March 8, 2025",
    url: "#"
  },
  {
    title: "The Future of Dental Supply Procurement: Interview with DentalDeals CEO",
    excerpt: "Dr. Michael Chen discusses how technology is transforming the way dental practices purchase supplies...",
    source: "Dental Tribune",
    date: "February 15, 2025",
    url: "#"
  }
];

// Company stats data
const companyStats = [
  {
    value: "$14.2M",
    label: "Total funding raised to date"
  },
  {
    value: "140+",
    label: "Brand partners offering exclusive deals"
  },
  {
    value: "12,000+",
    label: "Dental professionals using the platform"
  },
  {
    value: "$3.4M",
    label: "Total savings generated for dental practices in 2024"
  }
];

export default Press;
