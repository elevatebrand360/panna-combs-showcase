
import { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { UseEmblaCarouselType } from "embla-carousel-react";

interface ProductSliderProps {
  images: string[];
  productName: string;
}

const ProductSlider = ({ images, productName }: ProductSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full">
      <Carousel 
        className="w-full" 
        opts={{ 
          loop: true,
          align: "start",
        }}
        onSelect={(api: UseEmblaCarouselType[1]) => {
          setCurrentIndex(api.selectedScrollSnap());
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square w-full overflow-hidden rounded-md">
                <img
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="hidden md:block">
            <CarouselPrevious className="static transform-none" />
          </div>
          
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-brand-DEFAULT" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          
          <div className="hidden md:block">
            <CarouselNext className="static transform-none" />
          </div>
        </div>
        
        {/* Mobile swipe indicator */}
        {isMobile && (
          <div className="text-center text-xs text-muted-foreground mt-2">
            Swipe to view more images ({currentIndex + 1}/{images.length})
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
