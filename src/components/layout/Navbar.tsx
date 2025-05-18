
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl md:text-2xl text-brand-DEFAULT">PANNA COMBS</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:scale-105 hover:text-brand-DEFAULT transition-all">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:scale-105 hover:text-brand-DEFAULT transition-all">
            About Us
          </Link>
          <Link to="/products" className="text-sm font-medium hover:scale-105 hover:text-brand-DEFAULT transition-all">
            Products
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:scale-105 hover:text-brand-DEFAULT transition-all">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 flex flex-col gap-4 bg-background/95 backdrop-blur-lg p-6 md:hidden",
          isMenuOpen ? "animate-fade-in" : "animate-fade-out pointer-events-none hidden"
        )}
      >
        <Link 
          to="/" 
          className="text-lg font-medium hover:text-brand-DEFAULT transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="text-lg font-medium hover:text-brand-DEFAULT transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </Link>
        <Link 
          to="/products" 
          className="text-lg font-medium hover:text-brand-DEFAULT transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Products
        </Link>
        <Link 
          to="/contact" 
          className="text-lg font-medium hover:text-brand-DEFAULT transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
