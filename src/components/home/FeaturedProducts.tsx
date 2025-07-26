import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/lib/products";

// Helper functions for dynamic styling
const getCategoryGradient = (categoryId: number): string => {
  const gradients = [
    "from-violet-600 via-purple-600 to-indigo-600",      // Ladies Hair Comb
    "from-pink-500 via-rose-500 to-red-500",             // Ladies Fancy Combs
    "from-rose-600 via-pink-600 to-purple-600",          // Ladies Stylish Combs
    "from-blue-600 via-cyan-500 to-teal-500",            // Shampoo Combs
    "from-cyan-600 via-blue-500 to-indigo-500",          // Ladies Handle Combs
    "from-indigo-600 via-blue-600 to-cyan-500",          // Gents Combs
    "from-purple-600 via-violet-500 to-indigo-600",      // Premium Combs
    "from-slate-600 via-gray-500 to-zinc-500",           // Gents Pocket Combs
    "from-emerald-600 via-green-500 to-teal-500",        // Anti Lice and Tooth Combs
    "from-amber-600 via-orange-500 to-red-500",          // Export Combs
    "from-orange-600 via-red-500 to-pink-500",           // Family Pack
    "from-teal-600 via-emerald-500 to-green-500",        // Hair Brush Combs
    "from-gray-600 via-slate-500 to-zinc-500",           // Hotel Combs
    "from-yellow-500 via-amber-500 to-orange-500",       // Printed Combs
    "from-blue-700 via-indigo-600 to-purple-600",        // Salon Combs
    "from-amber-700 via-orange-600 to-red-600",          // Wooden Combs
    "from-orange-700 via-red-600 to-pink-600",           // Handmade Combs
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
    <section className="section-padding section-muted">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-5xl font-bold text-blue-400 tracking-tight drop-shadow-lg">
            Our Product Categories
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            Discover our complete range of premium combs, crafted for every style and need.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productCategories.map((category) => (
            <Card key={category.id} className="group relative overflow-hidden glass-card hover:shadow-2xl transition-all duration-500 rounded-2xl hover:-translate-y-2 border-0">
              {/* Header with category name and gradient background */}
              <div className={`px-8 py-6 bg-gradient-to-br ${getCategoryGradient(category.id)} relative overflow-hidden`}>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors drop-shadow-lg">
                    {category.name}
                  </h3>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                    <span className="text-white text-lg font-bold">
                      {getCategoryIcon(category.id)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <CardContent className="p-8">
                <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                  {category.description}
                </p>
                
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 py-3"
                >
                  <Link to={`/category/${category.slug}`}>
                    View Products
                  </Link>
                </Button>
              </CardContent>
              
              {/* Elegant accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-20">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold px-12 py-5 text-xl shadow-2xl rounded-full transition-all duration-500 hover:scale-105"
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
