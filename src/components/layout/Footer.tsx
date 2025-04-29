
import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
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
  );
};

export default Footer;
