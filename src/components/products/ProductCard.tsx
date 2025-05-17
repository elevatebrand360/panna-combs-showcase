
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  // Get the imageUrls if it exists, otherwise use the single image
  const imageUrl = 'imageUrls' in product ? 
    (product.imageUrls as string[])[0] : 
    product.image;

  return (
    <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-brand-DEFAULT text-white text-xs font-medium px-2 py-0.5 rounded">
            #{index + 1}
          </span>
          <h3 className="text-lg font-medium text-brand-dark">{product.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {product.category}
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Product Code: {product.productCode}
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
