
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    name: "9\" Ladies Hair Comb",
    image: "https://images.unsplash.com/photo-1599771334443-3048259bc702?q=80&w=1974&auto=format&fit=crop",
    category: "9\" Ladies Hair Comb",
    slug: "ladies-hair-comb",
  },
  {
    id: 2,
    name: "7\" Gents Combs",
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=2069&auto=format&fit=crop",
    category: "7\" Gents Combs",
    slug: "gents-combs",
  },
  {
    id: 3,
    name: "5\" Premium Combs",
    image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2070&auto=format&fit=crop",
    category: "5\" Premium Combs",
    slug: "premium-combs",
  },
  {
    id: 4,
    name: "Salon Combs",
    image: "https://images.unsplash.com/photo-1550103685-da83caf1f0c8?q=80&w=2070&auto=format&fit=crop",
    category: "Salon Combs",
    slug: "salon-combs",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular comb collections, crafted for durability and comfort.
          </p>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.category}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/products/${product.slug}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
