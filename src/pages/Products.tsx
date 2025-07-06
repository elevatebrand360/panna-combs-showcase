import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/products/CategoryCard";
import { productCategories } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import SEO from "@/components/SEO";
import { debounce } from "@/lib/performance";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState(productCategories);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Debounced search to improve performance
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  useEffect(() => {
    const initializePage = async () => {
      try {
        // Add a small delay to ensure proper loading
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Verify that categories are loaded
        if (productCategories && productCategories.length > 0) {
          setCategories(productCategories);
          console.log("Products page loaded successfully, categories count:", productCategories.length);
        } else {
          console.warn("No categories found, using fallback");
          setError("No product categories available");
        }
        
        setIsLoading(false);
        setIsInitialized(true);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products");
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializePage();
  }, []);

  // Debug logging
  useEffect(() => {
    if (isInitialized) {
      console.log("Products page fully initialized");
      console.log("Available categories:", categories.length);
    }
  }, [isInitialized, categories]);

  // Memoized filtered categories for better performance
  const filteredCategories = useMemo(() => {
    return categories.filter(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // Handle search input change with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <div className="space-y-3">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="ml-3"
            >
              Go to Home
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Hair Combs Collection - Premium Combs Manufacturer Kolkata | Panna Combs"
        description="Browse our complete collection of premium hair combs. Ladies combs, gents combs, salon combs, and premium styling combs. Best quality combs manufacturer in Kolkata since 1980."
        keywords="hair combs collection, ladies combs, gents combs, salon combs, premium combs, styling combs, comb manufacturer Kolkata, wholesale combs"
        canonical="https://pannacombs.com/products"
      />
      <Navbar />
      <main>
        <div className="bg-brand-DEFAULT text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-center text-3xl md:text-4xl lg:text-5xl">Our Products</h1>
            <p className="text-center mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Explore our wide range of high-quality combs for all your styling needs. 
              All our products are manufactured using premium materials for durability and comfort.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 md:py-12 px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-DEFAULT mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading products...</p>
              <p className="text-sm text-muted-foreground mt-2">Please wait while we load the product categories</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10">
                <h2 className="mb-4 md:mb-0 text-2xl md:text-3xl">Product Categories</h2>
                <div className="w-full md:w-1/3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search categories..." 
                      onChange={handleSearchChange}
                      className="pl-9 pr-9 max-w-md"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          setSearchQuery("");
                          debouncedSearch("");
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredCategories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-medium mb-2">No categories found</h3>
                  <p className="text-muted-foreground">
                    Try a different search term or browse all categories.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      debouncedSearch("");
                    }} 
                    className="mt-4"
                  >
                    Show All Categories
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
