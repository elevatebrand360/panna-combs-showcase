import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/products/ContactSection";
import ProductSlider from "@/components/products/ProductSlider";
import { getCategoryBySlug, productCategories, Product } from "@/lib/products";
import { getProducts } from "@/lib/firebase-crud";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = product 
    ? getCategoryBySlug(productCategories.find(cat => cat.name === product.category)?.slug || "") 
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const firebaseProducts = await getProducts();
        const foundProduct = firebaseProducts.find((p: any) => p.slug === productSlug);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to load product from database.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
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

  if (error || !product) {
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
              <h1 className="text-center font-playfair text-2xl md:text-3xl lg:text-4xl">{product.name}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <ProductSlider images={images} productName={product.name} />
            </div>
            
            <div>
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-brand-DEFAULT">{product.name}</h2>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  <p className="text-muted-foreground">Product Code: <span className="font-medium">{product.productCode}</span></p>
                  <p className="text-muted-foreground">Category: <span className="font-medium">{product.category}</span></p>
                </div>
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
