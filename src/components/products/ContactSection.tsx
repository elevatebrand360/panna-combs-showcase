
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";

interface ContactSectionProps {
  productName: string;
  productCode: string;
}

const ContactSection = ({ productName, productCode }: ContactSectionProps) => {
  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in ${productName} (Product Code: ${productCode}). Could you please provide more information?`
  );
  
  const whatsappLink = `https://wa.me/+91332644277?text=${whatsappMessage}`;
  
  return (
    <div className="bg-secondary/50 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-semibold mb-4">Contact Us About This Product</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="font-medium w-32">Factory:</span>
          <a href="tel:+91332644277" className="text-brand-DEFAULT hover:underline">
            +9133 2644 1277
          </a>
        </div>
        
        <div className="flex items-center">
          <span className="font-medium w-32">Email:</span>
          <a 
            href={`mailto:pannacombs@gmail.com?subject=Inquiry about ${productName}&body=Hello! I'm interested in ${productName} (Product Code: ${productCode}). Could you please provide more information?`}
            className="text-brand-DEFAULT hover:underline"
          >
            pannacombs@gmail.com
          </a>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5C]">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="w-5 h-5" />
            <span>Contact on WhatsApp</span>
          </a>
        </Button>
        
        <Button asChild variant="outline">
          <a href={`mailto:pannacombs@gmail.com?subject=Inquiry about ${productName}`}>
            Send Email Inquiry
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ContactSection;
