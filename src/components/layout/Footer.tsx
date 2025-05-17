
import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Panna Combs</h3>
            <p className="text-sm mb-4">
              Manufacturing premium quality combs since 1980. Our combs are made with the finest materials
              and craftsmanship to ensure durability and comfort.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-brand-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-brand-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-brand-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-brand-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center text-sm gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <span>Factory: +9133 2644 1277</span>
              </p>
              <p className="text-sm">Email: pannacombs@gmail.com</p>
              <p className="text-sm">Email: kothari79.nk@gmail.com</p>
              <p className="text-sm mt-2">Duilly, Nimtalla, Andul, Howrah - 711302</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Panna Combs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
