
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Building, Award, Users, ArrowRight } from "lucide-react";

const About = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>About DentalDeals | Our Mission</title>
        <meta name="description" content="Learn about DentalDeals, our mission to help dental professionals save money, and the team behind the platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DentalDeals</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to make dental supplies and equipment more affordable for dental professionals everywhere.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  DentalDeals was born out of frustration. Our founders, both dental professionals, were tired of the high markups and lack of transparency in dental supply pricing.
                </p>
                <p className="text-gray-600 mb-4">
                  In 2023, we set out to create a platform that would level the playing field for dental professionals – giving them access to wholesale pricing and exclusive deals typically reserved for large dental service organizations.
                </p>
                <p className="text-gray-600">
                  Today, DentalDeals partners with over 140 brands to bring significant savings to thousands of dental professionals across the country.
                </p>
              </div>
              <div className="md:w-1/2 bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
                  <div className="text-xl font-semibold text-gray-500">Our Team Photo</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're guided by a clear mission and core values that shape everything we do.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <Building className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To empower dental professionals with cost-effective access to quality supplies and equipment, allowing them to provide better care at lower costs.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A world where every dental practice can thrive by accessing fair pricing on the supplies and equipment they need, without compromising on quality.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Core Values</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate professionals behind DentalDeals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-40 h-40 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-500">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <Users className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl font-bold mb-6">Join Our Growing Team</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and helping dental professionals succeed.
            </p>
            <Link to="/careers">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
              >
                View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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

// Core values data
const values = [
  {
    title: "Transparency",
    description: "We believe in clear, honest communication about pricing, products, and partnerships."
  },
  {
    title: "Quality",
    description: "We only partner with trusted brands that meet our high standards for product excellence."
  },
  {
    title: "Affordability",
    description: "We're committed to making quality dental supplies accessible at fair prices."
  },
  {
    title: "Community",
    description: "We foster a supportive community of dental professionals who share knowledge and resources."
  },
  {
    title: "Innovation",
    description: "We continuously seek new ways to improve our platform and deliver better value."
  },
  {
    title: "Integrity",
    description: "We operate ethically in all our business dealings and partnerships."
  }
];

// Team members data
const teamMembers = [
  {
    name: "Dr. Michael Chen",
    role: "Co-Founder & CEO",
    bio: "Former dental practice owner with 15+ years of clinical experience. Passionate about bringing transparency to dental supply pricing."
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Co-Founder & COO",
    bio: "Previously managed a network of dental clinics. Expert in dental operations and supply chain management."
  },
  {
    name: "David Rodriguez",
    role: "CTO",
    bio: "Tech veteran with experience at leading healthcare platforms. Driving our technological innovation and user experience."
  },
  {
    name: "Emily Wong",
    role: "VP of Partnerships",
    bio: "Built relationships with over 100 dental brands. Negotiates the exclusive deals that power our platform."
  },
  {
    name: "James Taylor",
    role: "Head of Marketing",
    bio: "Digital marketing strategist with a background in healthcare technology. Leads our growth and community building efforts."
  },
  {
    name: "Amanda Martinez",
    role: "Customer Success Lead",
    bio: "Former dental office manager. Ensures our users get the most value from their DentalDeals membership."
  }
];

export default About;
