import { useState, useEffect, useCallback } from "react";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

type Slide = {
  id: number;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/hero1.png",
  },
  {
    id: 2,
    image: "/hero2.png",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(slides.length).fill(false));
  const { isMobile, isLowEndDevice } = useMobileOptimization();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Preload all images for faster switching
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide, index) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        };
        img.onerror = () => {
          console.warn(`Failed to preload image: ${slide.image}`);
        };
        // Add cache busting and optimization parameters
        img.src = `${slide.image}?v=${Date.now()}&w=${isMobile ? 800 : 1200}&q=80`;
      });
    };

    preloadImages();
  }, [isMobile]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isLowEndDevice) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // 2 seconds for all devices
    return () => clearInterval(interval);
  }, [isAutoPlaying, isLowEndDevice, nextSlide]);

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
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[300px] lg:h-[380px] xl:h-[450px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'} flex items-center justify-center`}
          >
            {!imagesLoaded[index] ? (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400 text-sm">Loading...</div>
              </div>
            ) : (
              <img
                src={`${slide.image}?v=${Date.now()}&w=${isMobile ? 800 : 1200}&q=80&f=webp`}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
