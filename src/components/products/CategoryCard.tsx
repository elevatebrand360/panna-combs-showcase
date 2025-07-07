import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@/lib/products";

interface CategoryCardProps {
  category: ProductCategory;
}

const getRandomImageId = (categoryId: number): string => {
  const imageIds = [
    "1599771334443-3048259bc702", // Ladies combs
    "1585751119414-ef2636f8aede", // Gents combs
    "1601612628452-9e99ced43524", // Premium combs
    "1550103685-da83caf1f0c8",    // Salon combs
    "1622429499146-bc47772d8a52", // Fancy combs
    "1590159763121-7c9fd312190d", // Stylish combs
    "1580618672591-eb180b1a973f", // Shampoo combs
    "1522337360788-8b13dee7a37e", // Handle combs
  ];
  return imageIds[categoryId % imageIds.length] || imageIds[0];
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.slug}`} className="block group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl">
      <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl hover:-translate-y-1 cursor-pointer">
        <div className="h-36 w-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-200">
          <img
            src={`https://images.unsplash.com/photo-${getRandomImageId(category.id)}?q=80&w=800&auto=format&fit=crop`}
            alt={category.name}
            loading="lazy"
            width={160}
            height={120}
            className="w-auto h-28 object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <CardContent className="p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-2 text-blue-800 text-center group-hover:text-blue-600 transition-colors">{category.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            {category.description}
          </p>
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-semibold rounded-full shadow group-hover:scale-105 transition-transform" tabIndex={-1} type="button" aria-hidden="true">
            Explore
          </Button>
        </CardContent>
        <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 shadow">
          {category.name.split(' ')[0]}
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
