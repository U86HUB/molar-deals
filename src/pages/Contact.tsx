
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;
  
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    submitted: false
  });
  
  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormState({
      ...formState,
      subject: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      toast.error("Please fill out all fields");
      return;
    }
    
    // In a real app, you would send the form data to a server here
    console.log("Form submitted:", formState);
    
    // Show success message
    toast.success("Message sent successfully! We'll be in touch soon.");
    
    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
      submitted: true
    });
    
    // Reset submitted state after 5 seconds
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        submitted: false
      }));
    }, 5000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | DentalDeals</title>
        <meta name="description" content="Get in touch with the DentalDeals team for support, partnership inquiries, or general questions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions, feedback, or need assistance? We're here to help.
            </p>
          </div>
        </section>
        
        {/* Contact Information Cards */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <Phone className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-xl font-bold mb-2">Phone</h2>
                <p className="text-muted-foreground mb-4">Mon-Fri, 9am-5pm ET</p>
                <p className="text-lg">(800) 555-1234</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <Mail className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-xl font-bold mb-2">Email</h2>
                <p className="text-muted-foreground mb-4">We'll respond within 24 hours</p>
                <p className="text-lg">contact@dentaldeals.com</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-xl font-bold mb-2">Office</h2>
                <p className="text-muted-foreground mb-4">Our headquarters</p>
                <p className="text-lg">123 Main Street, Suite 456</p>
                <p className="text-lg">San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                {formState.submitted ? (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                      <Select 
                        value={formState.subject} 
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Technical Support">Technical Support</SelectItem>
                          <SelectItem value="Billing Question">Billing Question</SelectItem>
                          <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                      <Textarea 
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </Button>
                  </form>
                )}
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                  <h2 className="text-3xl font-bold mb-6">We're Here For You</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                      <p className="text-muted-foreground mb-4">
                        Need help with your account, redeeming deals, or have questions about your membership?
                      </p>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-2" />
                        <span>support@dentaldeals.com</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Brand Partnerships</h3>
                      <p className="text-muted-foreground mb-4">
                        Interested in featuring your dental products or services on our platform?
                      </p>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-2" />
                        <span>partners@dentaldeals.com</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Media Inquiries</h3>
                      <p className="text-muted-foreground mb-4">
                        For press inquiries, interview requests, or media information.
                      </p>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-2" />
                        <span>press@dentaldeals.com</span>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-200">
                      <h3 className="text-xl font-bold mb-2">Connect With Us</h3>
                      <div className="flex space-x-4">
                        <a href="#" className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/10 transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/10 transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/10 transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22.225 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.452C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            <path d="M7.256 20.337H3.9V9.757h3.356v10.58zM5.576 8.15c-1.073 0-1.94-.88-1.94-1.95s.867-1.95 1.94-1.95 1.94.88 1.94 1.95-.867 1.95-1.94 1.95zM20.5 20.337h-3.35v-5.14c0-1.253-.021-2.863-1.736-2.863-1.73 0-2 1.363-2 2.772v5.23H9.966V9.757h3.213v1.472h.047c.443-.843 1.525-1.732 3.148-1.732 3.37 0 3.996 2.223 3.996 5.114v5.726h.13z" fill="white" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-96 bg-gray-100 flex items-center justify-center">
                <div className="text-lg font-medium text-gray-500">Map would be embedded here</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Contact Questions</h2>
            
            <div className="space-y-6">
              {contactFaqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
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

// Contact FAQs data
const contactFaqs = [
  {
    question: "What is the fastest way to get support?",
    answer: "For the fastest response, we recommend contacting our support team via email at support@dentaldeals.com. Premium members also have access to live chat support during business hours."
  },
  {
    question: "How long does it take to get a response?",
    answer: "We aim to respond to all inquiries within 24 hours during business days. Premium members typically receive responses within 4 hours."
  },
  {
    question: "How can I become a vendor on DentalDeals?",
    answer: "To explore partnership opportunities, please email partners@dentaldeals.com with information about your company and products. Our partnerships team will get back to you to discuss potential collaboration."
  },
  {
    question: "I'm having technical issues with the website. What should I do?",
    answer: "For technical support, please email support@dentaldeals.com with details about the issue you're experiencing, including your device, browser, and any error messages you see. Screenshots are always helpful."
  }
];

export default Contact;
