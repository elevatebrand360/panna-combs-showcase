import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/lib/products";

// Helper functions for dynamic styling
const getCategoryGradient = (categoryId: number): string => {
  const gradients = [
    "from-purple-500 to-pink-500",      // Ladies Hair Comb
    "from-pink-500 to-rose-500",        // Ladies Fancy Combs
    "from-rose-500 to-red-500",         // Ladies Stylish Combs
    "from-blue-500 to-cyan-500",        // Shampoo Combs
    "from-cyan-500 to-teal-500",        // Ladies Handle Combs
    "from-indigo-500 to-blue-500",      // Gents Combs
    "from-violet-500 to-purple-500",    // Premium Combs
    "from-slate-500 to-gray-500",       // Gents Pocket Combs
    "from-emerald-500 to-green-500",    // Anti Lice and Tooth Combs
    "from-amber-500 to-orange-500",     // Export Combs
    "from-orange-500 to-red-500",       // Family Pack
    "from-teal-500 to-emerald-500",     // Hair Brush Combs
    "from-gray-500 to-slate-500",       // Hotel Combs
    "from-yellow-500 to-amber-500",     // Printed Combs
    "from-blue-600 to-indigo-600",      // Salon Combs
    "from-amber-600 to-orange-600",     // Wooden Combs
    "from-orange-600 to-red-600",       // Handmade Combs
  ];
  return gradients[categoryId - 1] || gradients[0];
};

const getCategoryIconBg = (categoryId: number): string => {
  const backgrounds = [
    "bg-purple-500/80",      // Ladies Hair Comb
    "bg-pink-500/80",        // Ladies Fancy Combs
    "bg-rose-500/80",        // Ladies Stylish Combs
    "bg-blue-500/80",        // Shampoo Combs
    "bg-cyan-500/80",        // Ladies Handle Combs
    "bg-indigo-500/80",      // Gents Combs
    "bg-violet-500/80",      // Premium Combs
    "bg-slate-500/80",       // Gents Pocket Combs
    "bg-emerald-500/80",     // Anti Lice and Tooth Combs
    "bg-amber-500/80",       // Export Combs
    "bg-orange-500/80",      // Family Pack
    "bg-teal-500/80",        // Hair Brush Combs
    "bg-gray-500/80",        // Hotel Combs
    "bg-yellow-500/80",      // Printed Combs
    "bg-blue-600/80",        // Salon Combs
    "bg-amber-600/80",       // Wooden Combs
    "bg-orange-600/80",      // Handmade Combs
  ];
  return backgrounds[categoryId - 1] || backgrounds[0];
};

const getCategoryIcon = (categoryId: number): string => {
  const icons = [
    "🪮", // 1. Ladies Hair Comb - Hair comb
    "💎", // 2. Ladies Fancy Combs - Decorative/fancy comb
    "✨", // 3. Ladies Stylish Combs - Stylish/fashion comb
    "🧴", // 4. Shampoo Combs - Shampoo bottle
    "🖐️", // 5. Ladies Handle Combs - Hand with handle
    "🪮", // 6. Gents Combs - Men's comb
    "👑", // 7. Premium Combs - Crown for premium
    "👔", // 8. Gents Pocket Combs - Business/pocket
    "🔍", // 9. Anti Lice and Tooth Combs - Magnifying glass for fine teeth
    "🌍", // 10. Export Combs - Globe for international
    "👨‍👩‍👧‍👦", // 11. Family Pack - Family
    "🪮", // 12. Hair Brush Combs - Comb and brush
    "🏨", // 13. Hotel Combs - Hotel building
    "🎨", // 14. Printed Combs - Paint palette for custom prints
    "💇‍♀️", // 15. Salon Combs - Hair salon
    "🪵", // 16. Wooden Combs - Wood
    "🛠️", // 17. Handmade Combs - Tools for handmade
  ];
  return icons[categoryId - 1] || icons[0];
};

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productCategories.map((category) => (
            <Card key={category.id} className="group relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-xl hover:-translate-y-1">
              {/* Header with category name and gradient background */}
              <div className={`px-6 py-4 border-b border-gray-100 bg-gradient-to-r ${getCategoryGradient(category.id)}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                    {category.name}
                  </h3>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                    <span className="text-white text-sm font-semibold">
                      {category.name.split(' ')[0].charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <Button 
                  asChild 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Link to={`/category/${category.slug}`}>
                    View Products
                  </Link>
                </Button>
              </CardContent>
              
              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

export default FeaturedProducts;
