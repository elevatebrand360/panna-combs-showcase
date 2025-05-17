
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@/lib/products";

interface CategoryCardProps {
  category: ProductCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-2">{category.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
        <Button asChild>
          <Link to={`/products/category/${category.slug}`}>View Products</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
