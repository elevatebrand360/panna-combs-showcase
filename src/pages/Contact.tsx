import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
      duration: 5000,
    });
    
    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <>
      <SEO 
        title="Contact Panna Combs - Hair Comb Manufacturer Kolkata | Get Quote"
        description="Contact Panna Combs - Leading hair comb manufacturer in Kolkata. Call +913326441277 or email pannacombs@gmail.com for wholesale orders and inquiries."
        keywords="contact Panna Combs, comb manufacturer contact, wholesale combs Kolkata, comb factory Howrah, Panna Combs phone number"
        canonical="https://pannacombs.com/contact"
      />
      <Navbar />
      <main>
        <div className="bg-brand-DEFAULT text-white py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-center">Contact Us</h1>
            <p className="text-center mt-4 max-w-2xl mx-auto">
              Have questions or want to place an order? Get in touch with our team
              and we'll be happy to assist you.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-brand-light/10 rounded-full p-3">
                    <Phone className="text-brand-DEFAULT h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">Factory: +9133 2644 1277</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-brand-light/10 rounded-full p-3">
                    <Mail className="text-brand-DEFAULT h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">pannacombs@gmail.com</p>
                    <p className="text-muted-foreground">kothari79.nk@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-brand-light/10 rounded-full p-3">
                    <MapPin className="text-brand-DEFAULT h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">
                      Duilly, Nimtalla, Andul,<br />
                      Howrah - 711302
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-brand-light/10 hover:bg-brand-light/20 rounded-full p-3 transition-colors"
                    >
                      <Facebook className="text-brand-DEFAULT h-6 w-6" />
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-brand-light/10 hover:bg-brand-light/20 rounded-full p-3 transition-colors"
                    >
                      <Instagram className="text-brand-DEFAULT h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-96 mt-10">
          <iframe
            title="Panna Combs Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29493.02692699088!2d88.2441667!3d22.5413888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279a2a4b31c91%3A0xb78f2474a6a9c8e8!2sAndul%2C%20Howrah%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2sus!4v1716658725374!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
