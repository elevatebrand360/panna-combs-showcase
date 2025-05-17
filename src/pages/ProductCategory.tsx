
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { getProductsByCategory, getCategoryBySlug } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProductCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const categoryProducts = categorySlug ? getProductsByCategory(categorySlug) : [];
  
  const filteredProducts = categoryProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Scroll to top when category changes
    window.scrollTo(0, 0);
  }, [categorySlug]);

  if (!category) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="mb-4">Category Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the category you're looking for.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-brand-DEFAULT text-white py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <Link 
                to="/products" 
                className="text-white/80 hover:text-white mb-2 flex items-center text-sm"
              >
                ← Back to all categories
              </Link>
              <h1 className="text-center">{category.name}</h1>
              <p className="text-center mt-4 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="mb-4 md:mb-0">Products</h2>
            <div className="w-full md:w-1/3">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search products..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="max-w-md"
                />
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try a different search term or browse all products.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")} 
                className="mt-4"
              >
                Show All Products
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductCategory;
