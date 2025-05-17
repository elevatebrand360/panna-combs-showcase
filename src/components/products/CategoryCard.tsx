
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@/lib/products";

interface CategoryCardProps {
  category: ProductCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-muted bg-white/60">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4 text-brand-DEFAULT opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2 text-center text-brand-dark">{category.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center line-clamp-3">{category.description}</p>
        <Button asChild className="w-full">
          <Link to={`/products/category/${category.slug}`}>View Products</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
