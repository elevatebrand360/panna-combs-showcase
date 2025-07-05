import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  const handleDeleteClick = (id: string) => {
    console.log("Delete button clicked for product ID:", id);
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      console.log("Confirmed delete for product ID:", productToDelete);
      await handleDeleteProduct(productToDelete);
      setProductToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      console.log("Calling deleteProduct for ID:", id);
      await deleteProduct(id);
      toast({
        title: "Product deleted",
        description: "Product has been removed successfully"
      });
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error deleting product",
        description: error instanceof Error ? error.message : "An error occurred while deleting the product",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-brand-DEFAULT text-white py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-center">About Panna Combs</h1>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="about">About Us</TabsTrigger>
              <TabsTrigger value="values">Our Values</TabsTrigger>
              <TabsTrigger value="founders">Founding Fathers</TabsTrigger>
              <TabsTrigger value="factory">Our Factory</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                  <p className="mb-4">
                    Founded in 1980, Panna Combs has established itself as a premier manufacturer of high-quality combs in India. 
                    What began as a small family business has grown into a trusted name in the comb manufacturing industry, serving 
                    customers across India and exporting internationally.
                  </p>
                  <p className="mb-4">
                    Over the decades, we have maintained our commitment to quality while expanding our product range to meet the diverse 
                    needs of our customers. Each comb that leaves our factory is crafted with precision and care, ensuring durability and comfort.
                  </p>
                  <p>
                    Today, Panna Combs continues its legacy of excellence under the leadership of the founding family, blending traditional 
                    craftsmanship with modern manufacturing techniques to deliver products of outstanding quality.
                  </p>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1581957006327-32aa02d95084?q=80&w=2070&auto=format&fit=crop" 
                    alt="Panna Combs History" 
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-brand-DEFAULT text-white py-2 px-4 rounded">
                    <p className="font-bold">Est. 1980</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="values" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Quality</h3>
                  <p>
                    We are uncompromising in our commitment to quality. Each comb undergoes rigorous 
                    quality checks to ensure it meets our high standards before reaching customers.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p>
                    While respecting traditional craftsmanship, we continuously innovate to improve 
                    our products and manufacturing processes, incorporating new technologies and designs.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
                  <p>
                    Our customers are at the heart of everything we do. We listen to their feedback 
                    and strive to exceed their expectations with every product.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                  <p>
                    We conduct our business with honesty and transparency, building trust with 
                    our customers, employees, and partners over decades.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                  <p>
                    We are committed to environmentally responsible manufacturing practices, 
                    minimizing waste and exploring eco-friendly materials.
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Community</h3>
                  <p>
                    We support our local community in Howrah by providing employment opportunities 
                    and engaging in community development initiatives.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="founders" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Founding Fathers</h2>
                  <p className="mb-6">
                    Panna Combs was established by visionary entrepreneurs who saw an opportunity to create 
                    high-quality combs that would stand the test of time. Their dedication to craftsmanship 
                    and business ethics laid the foundation for what Panna Combs is today.
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Mr. Narayan Kothari</h3>
                    <p className="text-muted-foreground">
                      The visionary founder who started Panna Combs with a small workshop and a 
                      big dream. His attention to detail and insistence on quality set the standards 
                      that we continue to uphold.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">The Kothari Family</h3>
                    <p className="text-muted-foreground">
                      Over the decades, multiple generations of the Kothari family have contributed 
                      to the growth and success of Panna Combs, each adding their unique expertise 
                      while maintaining the core values established by the founder.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop" 
                    alt="Founding Fathers" 
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="factory" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Factory</h2>
                <p>
                  Located in Duilly, Nimtalla, Andul, Howrah, our factory combines traditional craftsmanship 
                  with modern manufacturing technology to produce combs of exceptional quality.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img 
                    src="https://images.unsplash.com/photo-1581873376296-43270eda0566?q=80&w=2060&auto=format&fit=crop" 
                    alt="Factory Interior" 
                    className="rounded-lg w-full h-64 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" 
                    alt="Manufacturing Process" 
                    className="rounded-lg w-full h-64 object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold">Manufacturing Process</h3>
                <p>
                  Our combs go through a meticulous manufacturing process that ensures each product meets 
                  our high standards:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Material Selection</h4>
                    <p className="text-sm text-muted-foreground">
                      We carefully select the highest quality materials for durability and comfort.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Precision Molding</h4>
                    <p className="text-sm text-muted-foreground">
                      Our combs are molded with precision to ensure perfect teeth spacing and smoothness.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Quality Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Each comb undergoes rigorous quality checks before packaging and shipping.
                    </p>
                  </div>
                </div>
                
                <p>
                  Our factory is equipped with modern machinery while still maintaining the human touch 
                  that ensures attention to detail. We take pride in our efficient production processes 
                  that allow us to meet both large wholesale orders and specialized custom requests.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
