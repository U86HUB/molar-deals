
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenAuth: () => void;
  isLoggedIn?: boolean;
}

export const Navbar = ({ onOpenAuth, isLoggedIn = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">DD</span>
          </div>
          <span className="text-xl font-bold text-gray-900">DentalDeals</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</Link>
          <Link to="/brands" className="text-gray-600 hover:text-primary transition-colors">Our Brands</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="primary">My Deals</Button>
              </Link>
              <Link to="/vendor">
                <Button variant="outline" className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  For Vendors
                </Button>
              </Link>
              <Link to="/settings">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">U</span>
                </div>
              </Link>
            </div>
          ) : (
            <>
              <Button variant="secondary" onClick={onOpenAuth}>Login</Button>
              <Button variant="primary" onClick={onOpenAuth}>Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link to="/" className="block py-2 text-gray-600 hover:text-primary transition-colors">Home</Link>
            <Link to="/how-it-works" className="block py-2 text-gray-600 hover:text-primary transition-colors">How It Works</Link>
            <Link to="/brands" className="block py-2 text-gray-600 hover:text-primary transition-colors">Our Brands</Link>
            <Link to="/pricing" className="block py-2 text-gray-600 hover:text-primary transition-colors">Pricing</Link>
            
            <div className="pt-3 border-t border-gray-100 space-y-3">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-3">
                  <Link to="/dashboard">
                    <Button className="w-full" variant="primary">My Deals</Button>
                  </Link>
                  <Link to="/vendor">
                    <Button className="w-full flex items-center justify-center" variant="outline">
                      <Tag className="mr-2 h-4 w-4" />
                      For Vendors
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button className="w-full" variant="secondary">Settings</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Button className="w-full" variant="secondary" onClick={onOpenAuth}>Login</Button>
                  <Button className="w-full" variant="primary" onClick={onOpenAuth}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
