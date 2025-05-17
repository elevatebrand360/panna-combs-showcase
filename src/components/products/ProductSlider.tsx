
import { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface ProductSliderProps {
  images: string[];
  productName: string;
}

const ProductSlider = ({ images, productName }: ProductSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square w-full overflow-hidden rounded-md">
                <img
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 mt-2">
          <CarouselPrevious className="static transform-none" />
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductSlider;
