
import { Phone, Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactCta = () => {
  return (
    <section className="bg-brand-DEFAULT text-white py-16">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="max-w-2xl mx-auto">
            Have questions about our products or want to place an order? Contact our team today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-xl mb-2">Call Us</h3>
            <p className="text-white/80 mb-4">Factory: +9133 2644 1277</p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-DEFAULT">
              <a href="tel:+91332644177">Call Now</a>
            </Button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-xl mb-2">Email Us</h3>
            <p className="text-white/80 mb-4">pannacombs@gmail.com</p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-DEFAULT">
              <a href="mailto:pannacombs@gmail.com">Send Email</a>
            </Button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Facebook size={24} />
            </div>
            <h3 className="text-xl mb-2">Facebook</h3>
            <p className="text-white/80 mb-4">Follow us on Facebook</p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-DEFAULT">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Visit Page</a>
            </Button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Instagram size={24} />
            </div>
            <h3 className="text-xl mb-2">Instagram</h3>
            <p className="text-white/80 mb-4">Follow us on Instagram</p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-DEFAULT">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Visit Profile</a>
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-white text-brand-DEFAULT hover:bg-white/90">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
