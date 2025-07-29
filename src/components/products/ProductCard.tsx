import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import MobileOptimizedImage from "@/components/ui/MobileOptimizedImage";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { isMobile } = useMobileOptimization();
  
  // Get the imageUrls if it exists, otherwise use the single image
  const imageUrl = 'imageUrls' in product && Array.isArray(product.imageUrls) && product.imageUrls.length > 0 ? 
    product.imageUrls[0] : 
    (product.image || '');

  return (
    <Card className="overflow-hidden glass-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <MobileOptimizedImage
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          width={isMobile ? 300 : 400}
          priority={true} // Always prioritize for instant loading
          fallbackSrc="/placeholder-product.svg"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-blue-600/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
            #{index + 1}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium text-brand-dark line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
          {product.category}
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Code: {product.productCode}
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
