import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/firebase-crud";
import { getCategoryBySlug, Product } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

// Define enhanced product interface to make image optional
interface EnhancedProduct extends Omit<Product, 'image'> {
  image?: string;
  imageUrls?: string[];
}

const ProductCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<EnhancedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const firebaseData = await getProducts();
        console.log("UI Fetched products:", firebaseData);
        // Robust category filtering
        const filtered = firebaseData.filter((p: any) => {
          const productCategory = (p.category || "").toLowerCase().trim();
          const matchingCategory = getCategoryBySlug(categorySlug || "");
          return matchingCategory && productCategory === matchingCategory.name.toLowerCase().trim();
        }).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          category: p.category,
          productCode: p.productCode,
          slug: p.slug,
          imageUrls: p.imageUrls || []
        }));
        setAllProducts(filtered);
      } catch (err) {
        setError("Failed to load products from database.");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [categorySlug]);
  
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h2>Loading products...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h2 className="text-red-500">{error}</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-brand-DEFAULT text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <Link 
                to="/products" 
                className="text-white/80 hover:text-white mb-2 flex items-center text-sm"
              >
                ← Back to all categories
              </Link>
              <h1 className="text-center font-playfair text-3xl md:text-4xl lg:text-5xl">{category.name}</h1>
              <p className="text-center mt-4 max-w-2xl mx-auto text-sm md:text-base">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-8 md:py-12 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10">
            <h2 className="mb-4 md:mb-0 text-brand-dark text-2xl md:text-3xl">Products</h2>
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search products..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="pl-9 pr-9 max-w-md"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id || `firebase-${index}`} 
                  product={{
                    ...product,
                    image: product.image || (product.imageUrls && product.imageUrls[0]) || ""
                  } as Product} 
                  index={index} 
                />
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
