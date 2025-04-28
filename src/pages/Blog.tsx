
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Book, Search, ArrowRight, Calendar, User } from "lucide-react";

const Blog = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>Blog | DentalDeals</title>
        <meta name="description" content="Insights, tips, and trends for dental professionals. Learn about practice management, new technologies, and industry updates." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">DentalDeals Blog</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Insights, tips, and trends for dental professionals.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10" 
              />
            </div>
          </div>
        </section>
        
        {/* Featured Post */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-secondary/30 rounded-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 flex items-center justify-center">
                  <Book className="h-12 w-12 text-gray-400" />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge variant="secondary" className="mb-3">Featured Article</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    The Future of Digital Dentistry: Trends to Watch in 2025
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Explore the latest technological advancements that are transforming the dental industry and how they can benefit your practice.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>April 20, 2025</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Dr. Michael Chen</span>
                    </div>
                  </div>
                  <Button>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Categories */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="technology">Technology</TabsTrigger>
                  <TabsTrigger value="practice">Practice Management</TabsTrigger>
                  <TabsTrigger value="clinical">Clinical</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post, index) => (
                    <BlogPostCard key={index} post={post} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="technology" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter(post => post.category === "Technology")
                    .map((post, index) => (
                      <BlogPostCard key={index} post={post} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="practice" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter(post => post.category === "Practice Management")
                    .map((post, index) => (
                      <BlogPostCard key={index} post={post} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="clinical" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter(post => post.category === "Clinical")
                    .map((post, index) => (
                      <BlogPostCard key={index} post={post} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get the latest articles, industry updates, and exclusive offers delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
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

// BlogPostCard component
interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image?: string;
}

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <Book className="h-8 w-8 text-gray-400" />
      </div>
      <div className="p-6">
        <Badge variant="outline" className="mb-2">
          {post.category}
        </Badge>
        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    title: "10 Ways to Reduce Supply Costs Without Compromising Quality",
    excerpt: "Practical tips for dental practices looking to optimize their supply budget while maintaining high standards.",
    category: "Practice Management",
    date: "April 22, 2025",
    author: "Dr. Sarah Johnson"
  },
  {
    title: "The Pros and Cons of Digital Impressions in Modern Dentistry",
    excerpt: "A comprehensive look at how digital impression technology is changing the workflow in dental practices.",
    category: "Technology",
    date: "April 18, 2025",
    author: "Dr. James Wilson"
  },
  {
    title: "Navigating Dental Insurance: Tips for Practice Administrators",
    excerpt: "Expert advice on managing insurance claims and maximizing reimbursements for your practice.",
    category: "Practice Management",
    date: "April 15, 2025",
    author: "Emma Thompson"
  },
  {
    title: "Latest Advances in Dental Implant Technology",
    excerpt: "Explore the newest developments in implant materials, techniques, and digital planning tools.",
    category: "Clinical",
    date: "April 12, 2025",
    author: "Dr. Robert Chen"
  },
  {
    title: "Building a Strong Online Presence for Your Dental Practice",
    excerpt: "Digital marketing strategies specifically tailored for dental professionals in today's competitive landscape.",
    category: "Practice Management",
    date: "April 8, 2025",
    author: "James Taylor"
  },
  {
    title: "Sustainable Dentistry: Reducing Environmental Impact in Your Practice",
    excerpt: "Practical steps to make your dental office more eco-friendly without sacrificing patient care.",
    category: "Clinical",
    date: "April 5, 2025",
    author: "Dr. Lisa Martinez"
  }
];

export default Blog;
