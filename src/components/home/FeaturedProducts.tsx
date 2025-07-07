import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/lib/products";

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg">Our Product Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our complete range of premium combs, crafted for every style and need.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productCategories.map((category) => (
            <Card key={category.id} className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl hover:-translate-y-1">
              <div className="h-40 w-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-200">
                <img
                  src={`https://images.unsplash.com/photo-${getRandomImageId(category.id)}?q=80&w=800&auto=format&fit=crop`}
                  alt={category.name}
                  loading="lazy"
                  width={200}
                  height={160}
                  className="w-auto h-32 object-contain group-hover:scale-105 transition-transform duration-300"
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
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-semibold rounded-full shadow group-hover:scale-105 transition-transform"
                >
                  <Link to={`/category/${category.slug}`}>
                    Explore
                  </Link>
                </Button>
              </CardContent>
              <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                {category.name.split(' ')[0]}
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold px-10 py-4 text-xl shadow-xl rounded-full transition-all duration-300"
          >
            <Link to="/products">
              View All Products
            </Link>
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
