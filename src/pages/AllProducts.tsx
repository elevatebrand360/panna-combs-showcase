import { useState, useEffect } from "react";
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
        console.error("Error loading products:", err);
        // Don't immediately show error, try to recover
        setTimeout(async () => {
          try {
            const retryData = await getProducts();
            const products = retryData.map((p: any) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              category: p.category,
              productCode: p.productCode,
              slug: p.slug,
              imageUrls: p.imageUrls || []
            }));
            setAllProducts(products);
            const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
            setCategories(uniqueCategories);
            setError(null);
          } catch (retryErr) {
            setError("Failed to load products from database. Please try refreshing the page.");
            setAllProducts([]);
          }
        }, 2000);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  
  const filteredProducts = allProducts.filter(product => {
    const query = searchQuery.toLowerCase().trim();
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    
    if (!query && !selectedCategory) return true;
    if (!query) return categoryMatch;
    
    const textMatch = (
      product.name.toLowerCase().includes(query) ||
      product.productCode.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
    
    return textMatch && categoryMatch;
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h2>Loading all products...</h2>
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
      <SEO 
        title="All Products - Complete Hair Combs Collection | Panna Combs"
        description="Browse our complete collection of hair combs. Search and filter by category, product name, or code. Panna Combs - Leading hair comb manufacturer in Howrah, Kolkata."
        keywords="all hair combs, complete comb collection, search combs, filter combs, hair comb catalog, wholesale combs"
        canonical="https://pannacombs.com/all-products"
      />
      <Navbar />
      <main>
        <div className="bg-brand-DEFAULT text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <Link 
                to="/products" 
                className="text-white/80 hover:text-white mb-2 flex items-center text-sm"
              >
                ← Back to categories
              </Link>
              <h1 className="text-center font-playfair text-3xl md:text-4xl lg:text-5xl">All Products</h1>
              <p className="text-center mt-4 max-w-2xl mx-auto text-sm md:text-base">
                Browse our complete collection of premium hair combs. Use the search and filter options to find exactly what you need.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-8 md:py-12 px-4">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
              <div className="flex-1 max-w-xs lg:max-w-sm w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search by product name, code, or description..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="pl-9 pr-9 w-full text-sm"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      title="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 ml-1">
                  Search across all products
                </p>
              </div>
              
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm bg-white w-full lg:w-40"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-brand-dark text-2xl md:text-3xl">Products</h2>
                {(searchQuery || selectedCategory) && (
                  <p className="text-muted-foreground text-sm mt-1">
                    {filteredProducts.length} of {allProducts.length} products found
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                )}
              </div>
              
              {(searchQuery || selectedCategory) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                  size="sm"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Products Grid */}
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
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                }} 
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

export default AllProducts; 