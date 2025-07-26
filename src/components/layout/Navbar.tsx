import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isMobile } = useMobileOptimization();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full glass-navbar">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
              <img 
                src="/logo.png" 
                alt="Panna Combs Logo"
                className="h-12 w-12 md:h-16 md:w-16 object-contain drop-shadow-lg mr-4"
                style={{ minWidth: 48 }}
              />
              <span className="font-bold text-2xl md:text-3xl lg:text-4xl text-blue-400 whitespace-nowrap">
                PANNA COMBS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/" 
              className="text-base font-medium text-foreground hover:text-blue-400 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-600/10"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-base font-medium text-foreground hover:text-blue-400 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-600/10"
            >
              About Us
            </Link>
            <Link 
              to="/products" 
              className="text-base font-medium text-foreground hover:text-blue-400 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-600/10"
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="text-base font-medium text-foreground hover:text-blue-400 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-600/10"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 h-auto w-auto"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="py-4 space-y-2 border-t">
            <Link
              to="/" 
              className="block text-base font-medium text-foreground hover:text-blue-400 transition-colors py-3 px-4 rounded-md hover:bg-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block text-base font-medium text-foreground hover:text-blue-400 transition-colors py-3 px-4 rounded-md hover:bg-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              to="/products" 
              className="block text-base font-medium text-foreground hover:text-blue-400 transition-colors py-3 px-4 rounded-md hover:bg-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="block text-base font-medium text-foreground hover:text-blue-400 transition-colors py-3 px-4 rounded-md hover:bg-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
