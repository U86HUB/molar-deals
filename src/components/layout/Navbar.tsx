
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Tag, Award, Shield, UserCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onOpenAuth?: () => void;
  isLoggedIn?: boolean;
}

export const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();
  
  // Mock admin status - in a real app this would come from auth
  const isAdmin = isAuthenticated && user?.email?.includes('admin');
  
  const handleSignOut = async () => {
    await signOut();
  };

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
          {isAuthenticated && (
            <Link to="/referrals" className="text-gray-600 hover:text-primary transition-colors">Leaderboard</Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="primary">My Deals</Button>
              </Link>
              <Link to="/referrals">
                <Button variant="outline" className="flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Referrals
                </Button>
              </Link>
              <Link to="/vendor">
                <Button variant="outline" className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  For Vendors
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="secondary" className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                    <span className="text-gray-700 font-medium text-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm">
                    {user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  <Link to="/settings">
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            {isAuthenticated && (
              <Link to="/referrals" className="block py-2 text-gray-600 hover:text-primary transition-colors">Leaderboard</Link>
            )}
            
            <div className="pt-3 border-t border-gray-100 space-y-3">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-3">
                  <Link to="/dashboard">
                    <Button className="w-full" variant="primary">My Deals</Button>
                  </Link>
                  <Link to="/referrals">
                    <Button className="w-full flex items-center justify-center" variant="outline">
                      <Award className="mr-2 h-4 w-4" />
                      Referrals
                    </Button>
                  </Link>
                  <Link to="/vendor">
                    <Button className="w-full flex items-center justify-center" variant="outline">
                      <Tag className="mr-2 h-4 w-4" />
                      For Vendors
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button className="w-full flex items-center justify-center" variant="secondary">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Link to="/settings">
                    <Button className="w-full" variant="secondary">Settings</Button>
                  </Link>
                  <Button className="w-full" variant="outline" onClick={handleSignOut}>Logout</Button>
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
