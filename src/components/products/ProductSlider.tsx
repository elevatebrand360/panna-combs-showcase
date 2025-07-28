
import { useState, useCallback } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { type CarouselApi } from "@/components/ui/carousel";

interface ProductSliderProps {
  images: string[];
  productName: string;
}

const ProductSlider = ({ images, productName }: ProductSliderProps) => {
  const filteredImages = images.filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Setup callback to handle carousel events
  const onApiChange = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCarouselApi(api);
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, []);

  // Function to handle dot indicator clicks
  const handleDotClick = useCallback((index: number) => {
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }
  }, [carouselApi]);

  return (
    <div className="w-full">
      <Carousel 
        className="w-full" 
        opts={{ 
          loop: true,
          align: "start",
        }}
        setApi={onApiChange}
      >
        <CarouselContent>
          {filteredImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square w-full overflow-hidden rounded-md hover:scale-105 transition-transform duration-300">
                <img
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation controls and swipe indicator only if 2+ images */}
        {filteredImages.length > 1 && (
          <>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="hidden md:block">
                <CarouselPrevious className="static transform-none hover:bg-brand-DEFAULT/20 transition-colors" />
              </div>
              <div className="flex gap-2">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all hover:scale-125 ${
                      currentIndex === index ? "bg-brand-DEFAULT w-4" : "bg-gray-300"
                    }`}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
              </div>
              <div className="hidden md:block">
                <CarouselNext className="static transform-none hover:bg-brand-DEFAULT/20 transition-colors" />
              </div>
            </div>
            {isMobile && (
              <div className="text-center text-xs text-muted-foreground mt-2">
                Swipe to view more images ({currentIndex + 1}/{filteredImages.length})
              </div>
            )}
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
