import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Premium Quality Combs",
    subtitle: "Crafted with excellence for everyday use",
    image: "https://images.unsplash.com/photo-1622288432450-277d0fef5ed9?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Explore Products",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Wide Range of Products",
    subtitle: "Find the perfect comb for your unique hair type",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop",
    buttonText: "View Collection",
    buttonLink: "/products",
  },
  {
    id: 3,
    title: "Trusted by Professionals",
    subtitle: "The choice of salons worldwide",
    image: "https://images.unsplash.com/photo-1601612628460-4caa76e185da?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
  {
    id: 4,
    title: "Family Owned Since 1980",
    subtitle: "A legacy of quality and craftsmanship",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop",
    buttonText: "Our Story",
    buttonLink: "/about",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <h1 className="text-white mb-4 drop-shadow-lg font-bold text-4xl md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="text-white/95 text-lg md:text-xl mb-8 drop-shadow-md font-medium">
                {slide.subtitle}
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={slide.buttonLink}>{slide.buttonText}</a>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-colors border border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-colors border border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 border-2 border-white/50",
              currentSlide === index ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
