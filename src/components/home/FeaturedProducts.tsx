import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/lib/products";

// Select the first 4 categories as featured products
const featuredCategories = productCategories.slice(0, 4);

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-blue-50/50">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-foreground">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our most popular comb collections, crafted for durability and comfort.
          </p>
        </div>
        
        <div className="product-grid">
          {featuredCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
              <div className="aspect-square overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${getRandomImageId(category.id)}?q=80&w=800&auto=format&fit=crop`}
                  alt={category.name}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 font-medium">
                  {category.description}
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-semibold"
                >
                  <Link to={`/category/${category.slug}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Function to get consistent images based on category ID
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

export default FeaturedProducts;
