
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/products/CategoryCard";
import { productCategories } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = productCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10">
            <h2 className="mb-4 md:mb-0 text-2xl md:text-3xl">Product Categories</h2>
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search categories..." 
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
                onClick={() => setSearchQuery("")} 
                className="mt-4"
              >
                Show All Categories
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
