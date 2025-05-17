
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutPreview = () => {
  return (
    <section className="section-padding">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="mb-4">About Panna Combs</h2>
            <p className="mb-4 text-muted-foreground">
              Since 1980, Panna Combs has been dedicated to manufacturing premium quality combs
              for customers worldwide. Our commitment to excellence and craftsmanship has made us
              a trusted name in the industry.
            </p>
            <p className="mb-6 text-muted-foreground">
              Located in Howrah, India, our factory combines traditional techniques with modern
              manufacturing processes to create combs that are both durable and comfortable to use.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <Button asChild size="lg">
                <Link to="/about">Our Story</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about/factory">Our Factory</Link>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <img
              src="https://images.unsplash.com/photo-1622288432443-fc17c2b2a09c?q=80&w=2070&auto=format&fit=crop"
              alt="Panna Combs Factory"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-brand-DEFAULT text-white py-2 px-4 rounded">
              <p className="font-bold">40+ Years</p>
              <p className="text-sm">of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
