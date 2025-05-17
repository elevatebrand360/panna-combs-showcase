
import { Link } from "react-router-dom";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutPreview from "@/components/home/AboutPreview";
import ContactCta from "@/components/home/ContactCta";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="font-poppins">
        <HeroSlider />
        <FeaturedProducts />
        <AboutPreview />
        <ContactCta />
        
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>Are you an administrator?</span>
            <Button variant="link" asChild className="h-auto p-0">
              <Link to="/admin" className="text-brand-DEFAULT hover:text-brand-light">
                Login to admin panel
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
