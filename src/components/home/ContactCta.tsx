import { Phone, Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WhatsAppIcon } from "@/components/ui/icons";

const ContactCta = () => {
  const whatsappMessage = encodeURIComponent(
    "Hi! I want to enquire about your hair combs. Could you please provide more information about your products and wholesale pricing?"
  );
  
  const whatsappLink = `https://wa.me/+919836599300?text=${whatsappMessage}`;

  return (
    <section className="section-brand text-white py-20">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="mb-6 text-4xl font-bold">Get In Touch</h2>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            Have questions about our products or want to place an order? Contact our team today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          <div className="glass-card rounded-xl p-8 hover:bg-blue-600/30 transition-all duration-300 hover:-translate-y-1">
            <div className="mx-auto w-16 h-16 bg-white/25 rounded-full flex items-center justify-center mb-6">
              <Phone size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Call Us</h3>
            <p className="text-white/90 mb-6 text-lg">Factory: +91 98365 99300</p>
            <Button 
              asChild 
              variant="outline"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:text-white font-semibold transition-all duration-300"
            >
              <a href="tel:+919836599300">Call Now</a>
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-8 hover:bg-blue-600/30 transition-all duration-300 hover:-translate-y-1">
            <div className="mx-auto w-16 h-16 bg-white/25 rounded-full flex items-center justify-center mb-6">
              <WhatsAppIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">WhatsApp</h3>
            <p className="text-white/90 mb-6 text-lg">Chat with us on WhatsApp</p>
            <Button 
              asChild 
              variant="outline"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:text-white font-semibold transition-all duration-300"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat Now</a>
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-8 hover:bg-blue-600/30 transition-all duration-300 hover:-translate-y-1">
            <div className="mx-auto w-16 h-16 bg-white/25 rounded-full flex items-center justify-center mb-6">
              <Mail size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Email Us</h3>
            <p className="text-white/90 mb-6 text-lg">pannacombs@gmail.com</p>
            <Button 
              asChild 
              variant="outline"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:text-white font-semibold transition-all duration-300"
            >
              <a href="mailto:pannacombs@gmail.com">Send Email</a>
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-8 hover:bg-blue-600/30 transition-all duration-300 hover:-translate-y-1">
            <div className="mx-auto w-16 h-16 bg-white/25 rounded-full flex items-center justify-center mb-6">
              <Facebook size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Facebook</h3>
            <p className="text-white/90 mb-6 text-lg">Follow us on Facebook</p>
            <Button 
              asChild 
              variant="outline"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:text-white font-semibold transition-all duration-300"
            >
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Visit Page</a>
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-8 hover:bg-blue-600/30 transition-all duration-300 hover:-translate-y-1">
            <div className="mx-auto w-16 h-16 bg-white/25 rounded-full flex items-center justify-center mb-6">
              <Instagram size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instagram</h3>
            <p className="text-white/90 mb-6 text-lg">Follow us on Instagram</p>
            <Button 
              asChild 
              variant="outline"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:text-white font-semibold transition-all duration-300"
            >
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Visit Profile</a>
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
