import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

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
    image: "https://images.unsplash.com/photo-1605496036008-38a51ea3ad70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    buttonText: "Explore Products",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Wide Range of Products",
    subtitle: "Find the perfect comb for your unique hair type",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    buttonText: "View Collection",
    buttonLink: "/products",
  },
  {
    id: 3,
    title: "Trusted by Professionals",
    subtitle: "The choice of salons worldwide",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isMobile, isLowEndDevice } = useMobileOptimization();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isLowEndDevice) return;
    const interval = setInterval(() => {
      nextSlide();
    }, isMobile ? 5000 : 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile, isLowEndDevice, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <div className="relative w-full overflow-hidden bg-background">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'} flex items-center justify-center`}
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
              <h1 className="text-white mb-4 drop-shadow-lg font-bold text-3xl md:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="text-white/95 text-lg md:text-xl mb-8 drop-shadow-md font-medium">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-1 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1 h-1 rounded-full border border-white/20 focus:outline-none transition-all duration-150 ${currentSlide === index ? 'bg-blue-500' : 'bg-white/20 hover:bg-white/40'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
