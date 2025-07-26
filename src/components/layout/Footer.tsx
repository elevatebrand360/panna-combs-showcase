import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-xl border-t border-white/10 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Panna Combs</h3>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Panna Combs is a leading comb manufacturing company based in Howrah, Kolkata. Our combs are made with the finest materials
              and craftsmanship to ensure durability and comfort.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1Hu1fhVvhZ/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a 
                href="https://www.instagram.com/pannacombs?igsh=MTB0eW9iN25uMjBpOQ%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/90 hover:text-white transition-colors text-lg font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/90 hover:text-white transition-colors text-lg font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/90 hover:text-white transition-colors text-lg font-medium">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/90 hover:text-white transition-colors text-lg font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/network-diagnostics" className="text-white/90 hover:text-white transition-colors text-lg font-medium">
                  Network Diagnostics
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={20} className="flex-shrink-0 mt-1 text-white/80" />
                <div>
                  <p className="text-white/90 font-medium">Factory</p>
                  <p className="text-white text-lg">+91 98365 99300</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail size={20} className="flex-shrink-0 mt-1 text-white/80" />
                <div>
                  <p className="text-white/90 font-medium">Email</p>
                  <p className="text-white text-lg">pannacombs@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-white/80" />
                <div>
                  <p className="text-white/90 font-medium">Address</p>
                  <p className="text-white text-lg">Duilly, Nimtalla, Andul, Howrah - 711302</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/80 text-lg">© {new Date().getFullYear()} Panna Combs. All rights reserved.</p>
          <p className="text-white/60 text-sm mt-2">
            <a href="https://www.elevatebrand360.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80 transition-colors">Developed by Elevate Brand 360</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
