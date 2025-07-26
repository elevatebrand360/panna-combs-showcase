import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutPreview = () => {
  return (
    <section className="section-padding section-light">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="mb-6 text-foreground">Our Legacy</h2>
            <p className="mb-8 text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              Panna Combs was born from the vision of Late Sri Dhanraj Kothari, a pioneering entrepreneur whose belief was simple yet profound: that everyday essentials should embody uncompromising quality.

              Hailing from Churu, Rajasthan, he set out on a journey that led him to Patna, where he laid the cornerstone of what would become our family’s enduring enterprise in comb manufacturing.

              As the business grew, so did his commitment to excellence—a commitment that eventually brought Panna Combs to Kolkata, where our name became synonymous with craftsmanship and trust.

              Today, his dedication and hardwork lives through the next generation of dedicated and passionate personal, his son Shri Nirmal Kothari, and the succeeding generation- Nitesh Kothari, Nitin Kothari, Owner of kolkata branch and Deepak Kothari, who handles the Bombay branch carrying forward his passion for creating combs that seamlessly blend tradition, innovation, and care.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <Button 
                asChild 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
              >
                <Link to="/about">Our Story</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 font-semibold px-8 py-3 text-lg transition-all duration-300"
              >
                <Link to="/about/factory">Our Factory</Link>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1622288432443-fc17c2b2a09c?q=80&w=800&auto=format&fit=crop"
                alt="Panna Combs Factory"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 right-6 glass-card py-4 px-6 rounded-lg">
                <p className="font-bold text-xl text-blue-400">40+ Years</p>
                <p className="text-sm opacity-90">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
