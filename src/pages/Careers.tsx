
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, ArrowRight } from "lucide-react";

const Careers = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>Careers at DentalDeals | Join Our Team</title>
        <meta name="description" content="Explore career opportunities at DentalDeals and join our mission to transform the dental supply industry." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Help us transform the dental supply industry and make quality equipment more accessible for practices everywhere.
                </p>
                <Button variant="primary" size="lg" onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}>
                  View Open Positions
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <Users className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Our Team Culture</h3>
                  <p className="text-gray-600 mb-4">
                    We're a passionate team of dental professionals, tech experts, and business innovators working together to create positive change in the dental industry.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Remote-friendly", "Flexible hours", "Health benefits", "Growth opportunities"].map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Join Us */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join DentalDeals?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're building something special, and we want you to be part of it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These principles guide our work and our culture.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="flex bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section id="openings" className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our team and help make a difference in the dental industry.
              </p>
            </div>
            
            <div className="space-y-6">
              {openings.map((opening, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{opening.title}</h3>
                      <div className="flex items-center mt-1 text-muted-foreground">
                        <span>{opening.department}</span>
                        <span className="mx-2">•</span>
                        <span>{opening.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={opening.type === "Full-time" ? "default" : "outline"}>
                        {opening.type}
                      </Badge>
                      {opening.remote && <Badge variant="secondary">Remote</Badge>}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{opening.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Posted {opening.postedDate}
                    </div>
                    <Button variant="outline">Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* No Openings Fallback */}
            {openings.length === 0 && (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-xl font-bold mb-2">No Open Positions Currently</h3>
                <p className="text-gray-600 mb-4">
                  We don't have any specific openings right now, but we're always interested in meeting talented people.
                </p>
                <Button variant="outline">Submit Your Resume</Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Application Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Application Process</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Here's what to expect when you apply to join our team.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {applicationSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Don't See the Right Position?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about our mission.
              Send us your resume and let us know how you can contribute.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
            >
              Send Us Your Resume <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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

// Benefits data
const benefits = [
  {
    title: "Make an Impact",
    description: "Your work will directly help thousands of dental practices save money and provide better care.",
    icon: CheckCircle
  },
  {
    title: "Grow with Us",
    description: "We're expanding rapidly, creating opportunities for career advancement and professional development.",
    icon: CheckCircle
  },
  {
    title: "Work Flexibility",
    description: "Enjoy a flexible work environment with remote options and work-life balance.",
    icon: CheckCircle
  },
  {
    title: "Competitive Benefits",
    description: "Comprehensive health coverage, retirement plans, and competitive compensation packages.",
    icon: CheckCircle
  },
  {
    title: "Collaborative Culture",
    description: "Work with smart, passionate people who care about making a difference.",
    icon: CheckCircle
  },
  {
    title: "Continuous Learning",
    description: "Professional development stipends and regular learning opportunities.",
    icon: CheckCircle
  }
];

// Values data
const values = [
  {
    title: "Integrity Above All",
    description: "We do what's right, even when it's difficult. Honesty and ethical conduct guide all our decisions."
  },
  {
    title: "Customer Obsession",
    description: "We're relentlessly focused on creating value for dental professionals and exceeding their expectations."
  },
  {
    title: "Innovation & Creativity",
    description: "We challenge the status quo and find creative solutions to industry problems."
  },
  {
    title: "Inclusivity & Respect",
    description: "We value diverse perspectives and treat everyone with dignity and respect."
  },
  {
    title: "Continuous Improvement",
    description: "We're never satisfied with the status quo and constantly seek to improve our products and processes."
  },
  {
    title: "Work-Life Harmony",
    description: "We believe in sustainable work practices that allow our team to thrive professionally and personally."
  }
];

// Open positions data
const openings = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    remote: true,
    description: "We're looking for an experienced full stack developer to help build and scale our platform. You'll work on challenging problems and implement features that directly impact our users.",
    postedDate: "April 15, 2025"
  },
  {
    title: "Dental Industry Account Manager",
    department: "Partnerships",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: false,
    description: "Join our partnerships team to manage relationships with dental supply brands and negotiate exclusive deals for our platform.",
    postedDate: "April 18, 2025"
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote (US)",
    type: "Full-time",
    remote: true,
    description: "Help us reach more dental professionals through creative marketing campaigns and content strategies.",
    postedDate: "April 20, 2025"
  },
  {
    title: "Customer Success Representative",
    department: "Customer Success",
    location: "Remote (US)",
    type: "Part-time",
    remote: true,
    description: "Provide exceptional support to our users and help them get the most value from our platform.",
    postedDate: "April 22, 2025"
  }
];

// Application process steps
const applicationSteps = [
  {
    title: "Application",
    description: "Submit your resume and cover letter through our careers page."
  },
  {
    title: "Initial Screening",
    description: "Quick phone call with our recruiting team to learn more about you."
  },
  {
    title: "Technical Interview",
    description: "In-depth discussion about your skills and experience with the hiring manager."
  },
  {
    title: "Final Interview",
    description: "Meet the team and get a feel for our culture and working environment."
  }
];

export default Careers;
