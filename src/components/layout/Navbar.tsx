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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-lg shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Panna Combs Logo"
              className="h-12 w-12 md:h-16 md:w-16 object-contain drop-shadow-lg"
              style={{ minWidth: 48 }}
            />
            <span className="font-bold text-xl md:text-2xl text-blue-600 whitespace-nowrap">PANNA COMBS</span>
          </Link>
        </div>

        {/* Always-visible Nav, horizontally scrollable on mobile */}
        <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none px-2">
          <Link to="/" className="text-base sm:text-sm font-medium text-foreground hover:text-blue-600 transition-colors clickable py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            Home
          </Link>
          <Link to="/about" className="text-base sm:text-sm font-medium text-foreground hover:text-blue-600 transition-colors clickable py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            About Us
          </Link>
          <Link to="/products" className="text-base sm:text-sm font-medium text-foreground hover:text-blue-600 transition-colors clickable py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            Products
          </Link>
          <Link to="/contact" className="text-base sm:text-sm font-medium text-foreground hover:text-blue-600 transition-colors clickable py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
