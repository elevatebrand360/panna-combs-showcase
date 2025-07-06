import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
              <img
                src="/logo.png"
                alt="Panna Combs Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-lg"
                style={{ minWidth: 40 }}
              />
              <span className="font-bold text-lg md:text-xl lg:text-2xl text-blue-600 whitespace-nowrap">
                PANNA COMBS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-base font-medium text-foreground hover:text-blue-600 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-base font-medium text-foreground hover:text-blue-600 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              About Us
            </Link>
            <Link 
              to="/products" 
              className="text-base font-medium text-foreground hover:text-blue-600 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="text-base font-medium text-foreground hover:text-blue-600 transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="block text-base font-medium text-foreground hover:text-blue-600 transition-colors py-3 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block text-base font-medium text-foreground hover:text-blue-600 transition-colors py-3 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              to="/products" 
              className="block text-base font-medium text-foreground hover:text-blue-600 transition-colors py-3 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="block text-base font-medium text-foreground hover:text-blue-600 transition-colors py-3 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
