
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Presentation,
  Calendar,
  Clock,
  UserCircle,
  Play,
  ArrowRight,
  Filter
} from "lucide-react";

const Webinars = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;
  
  // Filter state
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Toggle filter function
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  // Filter webinars based on active filters
  const filterWebinars = (webinars: typeof upcomingWebinars) => {
    if (activeFilters.length === 0) return webinars;
    return webinars.filter(webinar => 
      activeFilters.includes(webinar.category)
    );
  };

  return (
    <>
      <Helmet>
        <title>Webinars | DentalDeals</title>
        <meta name="description" content="Join live educational webinars for dental professionals covering clinical topics, practice management, and the latest industry trends." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dental Webinars & Events</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join expert-led webinars designed to help you grow your practice, enhance your skills, and stay updated on industry trends.
            </p>
            <Button variant="primary" size="lg">
              Register for Upcoming Webinars
            </Button>
          </div>
        </section>
        
        {/* Featured Webinar */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-primary text-primary-foreground rounded-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto bg-primary/80 relative flex items-center justify-center">
                  <Presentation className="h-16 w-16 text-white/90" />
                  <Badge className="absolute top-4 left-4 bg-white/20 text-white border-white/10">Featured</Badge>
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge variant="secondary" className="mb-3">Premium Event</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Maximizing Profitability: Modern Dental Practice Management
                  </h2>
                  <p className="text-primary-foreground/80 mb-6">
                    Learn proven strategies to reduce overhead, optimize scheduling, and increase case acceptance.
                  </p>
                  <div className="flex items-center text-sm text-primary-foreground/70 mb-6 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>May 15, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>1:00 PM ET</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Reserve Your Seat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Webinar Tabs */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <Tabs defaultValue="upcoming">
              <div className="flex justify-between items-center mb-8">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming Webinars</TabsTrigger>
                  <TabsTrigger value="recorded">Recorded Webinars</TabsTrigger>
                </TabsList>
                
                <div className="relative">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter by Topic</span>
                  </Button>
                  
                  {/* Filter dropdown would go here in a real implementation */}
                  <div className="hidden absolute right-0 top-full mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={category}
                            checked={activeFilters.includes(category)}
                            onChange={() => toggleFilter(category)}
                            className="mr-2"
                          />
                          <label htmlFor={category}>{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <TabsContent value="upcoming" className="mt-0">
                <div className="space-y-6">
                  {filterWebinars(upcomingWebinars).map((webinar, index) => (
                    <WebinarCard 
                      key={index} 
                      webinar={webinar} 
                      buttonText="Register Now"
                      buttonIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recorded" className="mt-0">
                <div className="space-y-6">
                  {filterWebinars(recordedWebinars).map((webinar, index) => (
                    <WebinarCard 
                      key={index} 
                      webinar={webinar} 
                      buttonText="Watch Recording"
                      buttonIcon={<Play className="ml-2 h-4 w-4" />}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join Our Webinars?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Educational content designed specifically for dental professionals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {webinarBenefits.map((benefit, index) => (
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
        
        {/* Presenters/Speakers Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Expert Speakers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Learn from industry leaders with proven expertise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                    <UserCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="font-bold mb-1">{speaker.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{speaker.title}</p>
                  <p className="text-xs text-muted-foreground">{speaker.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Subscription CTA */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Never Miss a Webinar</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to our webinar notifications and be the first to know about our upcoming events.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
              >
                Subscribe to Updates
              </Button>
              <Link to="/help">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/80 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
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

// WebinarCard component
interface Webinar {
  title: string;
  description: string;
  date: string;
  time: string;
  presenter: string;
  category: string;
  isPremium: boolean;
}

interface WebinarCardProps {
  webinar: Webinar;
  buttonText: string;
  buttonIcon: React.ReactNode;
}

const WebinarCard = ({ webinar, buttonText, buttonIcon }: WebinarCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-gray-50 p-6 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-100">
          <Calendar className="h-8 w-8 text-primary mb-2" />
          <div className="text-lg font-bold">{webinar.date}</div>
          <div className="text-sm text-muted-foreground">{webinar.time}</div>
        </div>
        <div className="md:w-3/4 p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline">{webinar.category}</Badge>
            {webinar.isPremium && (
              <Badge variant="secondary">Premium</Badge>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
          <p className="text-gray-600 mb-4">{webinar.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <UserCircle className="h-4 w-4 mr-1" />
              <span>Presenter: {webinar.presenter}</span>
            </div>
            <Button variant={webinar.isPremium ? "primary" : "outline"} className="flex items-center">
              {buttonText}
              {buttonIcon}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Categories for filtering
const categories = [
  "Clinical Techniques",
  "Practice Management",
  "Technology",
  "Patient Care",
  "Business Growth"
];

// Upcoming webinars data
const upcomingWebinars: Webinar[] = [
  {
    title: "Digital Impressions: A Comprehensive Guide for Modern Practices",
    description: "Learn how to implement digital impression technology in your practice for better accuracy and patient comfort.",
    date: "May 10, 2025",
    time: "2:00 PM ET",
    presenter: "Dr. James Wilson",
    category: "Technology",
    isPremium: false
  },
  {
    title: "Maximizing Profitability: Modern Dental Practice Management",
    description: "Learn proven strategies to reduce overhead, optimize scheduling, and increase case acceptance.",
    date: "May 15, 2025",
    time: "1:00 PM ET",
    presenter: "Dr. Sarah Johnson",
    category: "Practice Management",
    isPremium: true
  },
  {
    title: "Advanced Techniques in Cosmetic Dentistry",
    description: "Master the latest techniques in cosmetic dentistry to deliver outstanding esthetic results.",
    date: "May 22, 2025",
    time: "3:00 PM ET",
    presenter: "Dr. Michael Chen",
    category: "Clinical Techniques",
    isPremium: true
  },
  {
    title: "Effective Marketing Strategies for Dental Practices",
    description: "Discover proven marketing techniques to attract new patients and build your brand.",
    date: "June 5, 2025",
    time: "12:00 PM ET",
    presenter: "James Taylor",
    category: "Business Growth",
    isPremium: false
  }
];

// Recorded webinars data
const recordedWebinars: Webinar[] = [
  {
    title: "Implementing Teledentistry in Your Practice",
    description: "A step-by-step guide to adding teledentistry services to expand your practice's reach.",
    date: "April 15, 2025",
    time: "On Demand",
    presenter: "Dr. Lisa Martinez",
    category: "Technology",
    isPremium: false
  },
  {
    title: "Mastering Dental Photography for Case Documentation",
    description: "Learn professional techniques for clinical photography to enhance case presentations and patient communication.",
    date: "April 3, 2025",
    time: "On Demand",
    presenter: "Dr. Robert Chen",
    category: "Clinical Techniques",
    isPremium: false
  },
  {
    title: "Staff Training and Development for Practice Success",
    description: "Effective strategies for training your team to provide exceptional patient care and improve office efficiency.",
    date: "March 28, 2025",
    time: "On Demand",
    presenter: "Emma Thompson",
    category: "Practice Management",
    isPremium: true
  },
  {
    title: "Creating Memorable Patient Experiences",
    description: "Learn how to design patient experiences that drive satisfaction, referrals, and practice growth.",
    date: "March 15, 2025",
    time: "On Demand",
    presenter: "Dr. Sarah Johnson",
    category: "Patient Care",
    isPremium: false
  }
];

// Webinar benefits data
const webinarBenefits = [
  {
    title: "Expert Insights",
    description: "Learn directly from industry leaders and clinical experts with years of experience.",
    icon: UserCircle
  },
  {
    title: "Practical Knowledge",
    description: "Gain actionable techniques and strategies you can implement in your practice right away.",
    icon: Play
  },
  {
    title: "CE Credits",
    description: "Many of our webinars offer continuing education credits to help maintain your licensure.",
    icon: Calendar
  }
];

// Speakers data
const speakers = [
  {
    name: "Dr. Sarah Johnson",
    title: "Practice Management Expert",
    bio: "Former dental practice owner with 15+ years of experience helping practices optimize operations and profitability."
  },
  {
    name: "Dr. James Wilson",
    title: "Digital Dentistry Specialist",
    bio: "Pioneering dentist in the adoption and implementation of digital workflows in dental practices."
  },
  {
    name: "Dr. Michael Chen",
    title: "Cosmetic Dentistry Expert",
    bio: "Internationally recognized cosmetic dentist with a focus on minimally invasive esthetic procedures."
  },
  {
    name: "Emma Thompson",
    title: "Dental Team Development",
    bio: "Practice consultant specializing in staff training, team building, and practice culture development."
  }
];

export default Webinars;
