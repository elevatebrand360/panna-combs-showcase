import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/firebase-crud";
import { Product } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import SEO from "@/components/SEO";

// Define enhanced product interface
interface EnhancedProduct extends Omit<Product, 'image'> {
  image?: string;
  imageUrls?: string[];
}

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allProducts, setAllProducts] = useState<EnhancedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const firebaseData = await getProducts();
        
        const products = firebaseData.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          category: p.category,
          productCode: p.productCode,
          slug: p.slug,
          imageUrls: p.imageUrls || []
        }));
        
        setAllProducts(products);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to load products from database.");
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Memoize filtered products for better performance
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "" || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  if (loading) {
    return (
      <>
        <SEO 
          title="All Products - Panna Combs" 
          description="Browse our complete collection of high-quality combs and hair accessories."
        />
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto py-20 px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO 
          title="Error - Panna Combs" 
          description="Unable to load products."
        />
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto py-20 px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title="All Products - Panna Combs" 
        description="Browse our complete collection of high-quality combs and hair accessories."
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto py-8 px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of premium combs and hair accessories
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X size={16} />
                </Button>
              )}
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedCategory === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("")}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* Clear Filters */}
            {(searchQuery || selectedCategory) && (
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
          </div>

          {/* Products Grid */}
          <div className="mb-8">
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
                  Try adjusting your search terms or filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={clearFilters} 
                  className="mt-4"
                >
                  Show All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllProducts; 