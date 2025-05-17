
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/products/CategoryCard";
import { productCategories } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = productCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-brand-DEFAULT text-white py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-center">Our Products</h1>
            <p className="text-center mt-4 max-w-2xl mx-auto">
              Explore our wide range of high-quality combs for all your styling needs. 
              All our products are manufactured using premium materials for durability and comfort.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="mb-4 md:mb-0">Product Categories</h2>
            <div className="w-full md:w-1/3">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search categories..." 
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
          
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
