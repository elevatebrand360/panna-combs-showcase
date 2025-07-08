import { Link } from "react-router-dom";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutPreview from "@/components/home/AboutPreview";
import ContactCta from "@/components/home/ContactCta";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="Panna Combs - Best Hair Combs Manufacturer in Howrah, Kolkata | Premium Combs"
        description="Panna Combs - Leading hair comb manufacturer in Howrah, Kolkata. Premium quality combs for salons, professionals & personal use. Wide range of 5 inch, 7 inch, 9 inch combs. Contact us for wholesale orders."
        keywords="hair combs, comb manufacturer, Kolkata combs, Howrah comb factory, salon combs, professional combs, wholesale combs, 5 inch combs, 7 inch combs, 9 inch combs"
        canonical="https://pannacombs.com"
      />
      <Navbar />
      <main className="font-poppins">
        <HeroSlider />
        <FeaturedProducts />
        <AboutPreview />
        <ContactCta />
        
        <div className="container mx-auto px-4 py-8 text-center bg-blue-50/30">
          <div className="inline-flex items-center gap-3 text-base text-muted-foreground bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
            <span className="font-medium">Are you an administrator?</span>
            <Button variant="link" asChild className="h-auto p-0 text-blue-600 hover:text-blue-700 font-semibold">
              <Link to="/admin" className="text-blue-600 hover:text-blue-700 underline-offset-4">
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
