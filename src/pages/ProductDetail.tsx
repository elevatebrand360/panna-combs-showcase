
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/products/ContactSection";
import ProductSlider from "@/components/products/ProductSlider";
import { getProductBySlug, getCategoryBySlug, productCategories } from "@/lib/products";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const category = product 
    ? getCategoryBySlug(productCategories.find(cat => cat.name === product.category)?.slug || "") 
    : null;
  
  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    
    // First, check for product in database (localStorage)
    const storedProducts = localStorage.getItem("panna-products");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const foundProduct = products.find((p: any) => p.slug === productSlug);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
        return;
      }
    }
    
    // If not found in database, check the hardcoded products
    const hardcodedProduct = productSlug ? getProductBySlug(productSlug) : null;
    if (hardcodedProduct) {
      // Convert hardcoded product to have the same format as database products
      const convertedProduct = {
        ...hardcodedProduct,
        imageUrls: [hardcodedProduct.image, hardcodedProduct.image, hardcodedProduct.image, hardcodedProduct.image]
      };
      setProduct(convertedProduct);
    } else {
      setProduct(null);
    }
    
    setLoading(false);
  }, [productSlug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="mb-4">Product Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  // Use imageUrls if available, otherwise use the single image property
  const images = product.imageUrls || [product.image, product.image, product.image, product.image];

  return (
    <>
      <Navbar />
      <main className="pb-12">
        <div className="bg-brand-DEFAULT text-white py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm mb-2">
                <Link to="/products" className="text-white/80 hover:text-white">
                  Products
                </Link>
                <span className="text-white/60">›</span>
                {category && (
                  <>
                    <Link to={`/products/category/${category.slug}`} className="text-white/80 hover:text-white">
                      {category.name}
                    </Link>
                    <span className="text-white/60">›</span>
                  </>
                )}
                <span className="text-white">{product.name}</span>
              </div>
              <h1 className="text-center font-playfair">{product.name}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="overflow-hidden rounded-lg">
              <ProductSlider images={images} productName={product.name} />
            </div>
            
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 text-brand-DEFAULT">{product.name}</h2>
                <p className="text-muted-foreground">Product Code: {product.productCode}</p>
                <p className="text-muted-foreground">Category: {product.category}</p>
              </div>
              
              <div className="border-t border-b py-6 my-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-dark">Product Description</h3>
                <p>{product.description}</p>
              </div>
              
              <ContactSection 
                productName={product.name} 
                productCode={product.productCode} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
