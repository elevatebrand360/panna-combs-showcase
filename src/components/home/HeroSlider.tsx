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
            <img
              src={slide.image}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
