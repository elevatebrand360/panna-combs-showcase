
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-1">{product.name}</h3>
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
