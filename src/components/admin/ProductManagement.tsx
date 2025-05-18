import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { productCategories } from "@/lib/products";
import { AlertCircle } from "lucide-react";

const ProductManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("add");
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    productCode: "",
    imageUrls: ["", "", "", ""],
    slug: ""
  });
  
  const [imageErrors, setImageErrors] = useState<boolean[]>([false, false, false, false]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem("panna-products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct(prev => ({
      ...prev,
      category: value
    }));
  };

  const isValidImageUrl = (url: string): boolean => {
    if (!url) return true; // Empty URLs are considered valid during typing
    const lowerCaseUrl = url.toLowerCase();
    return lowerCaseUrl.endsWith('.jpg') || 
           lowerCaseUrl.endsWith('.jpeg') || 
           lowerCaseUrl.endsWith('.png');
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const updatedImageUrls = [...newProduct.imageUrls];
    updatedImageUrls[index] = value;
    
    // Update error state for this image
    const isValid = isValidImageUrl(value);
    const updatedErrors = [...imageErrors];
    updatedErrors[index] = !isValid && value !== "";
    
    setNewProduct(prev => ({
      ...prev,
      imageUrls: updatedImageUrls
    }));
    
    setImageErrors(updatedErrors);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.category || !newProduct.productCode) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if all image URLs are valid format
    if (newProduct.imageUrls.some((url, index) => !url || !isValidImageUrl(url))) {
      toast({
        title: "Invalid image URLs",
        description: "Please provide all four images in JPG or PNG format only",
        variant: "destructive"
      });
      return;
    }

    const slug = generateSlug(newProduct.name);
    const id = Date.now();
    
    const product = {
      ...newProduct,
      id,
      slug,
      date: new Date().toISOString()
    };
    
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("panna-products", JSON.stringify(updatedProducts));
    
    toast({
      title: "Product added",
      description: `${product.name} has been added successfully`
    });
    
    // Reset form
    setNewProduct({
      name: "",
      description: "",
      category: "",
      productCode: "",
      imageUrls: ["", "", "", ""],
      slug: ""
    });
    setImageErrors([false, false, false, false]);
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("panna-products", JSON.stringify(updatedProducts));
    
    toast({
      title: "Product deleted",
      description: "Product has been removed successfully"
    });
  };

  const filteredProducts = selectedProduct 
    ? products.filter(p => p.category === selectedProduct)
    : products;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="add">Add Product</TabsTrigger>
          <TabsTrigger value="manage">Manage Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Product Code</label>
              <Input
                name="productCode"
                value={newProduct.productCode}
                onChange={handleInputChange}
                placeholder="Enter product code (e.g. PC001)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select value={newProduct.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">
              Product Images (4 required - JPG or PNG only)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newProduct.imageUrls.map((url, index) => (
                <div key={index}>
                  <div className="relative">
                    <Input
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder={`Image ${index + 1} URL (JPG or PNG only)`}
                      className={`mb-2 ${imageErrors[index] ? 'border-red-500' : ''}`}
                    />
                    {imageErrors[index] && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
                        <AlertCircle size={16} />
                      </div>
                    )}
                  </div>
                  {imageErrors[index] && (
                    <p className="text-xs text-red-500 mb-2">JPG or PNG format only</p>
                  )}
                  {url && !imageErrors[index] && (
                    <div className="h-24 w-full bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={url} 
                        alt={`Preview ${index + 1}`} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image";
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleAddProduct}>Add Product</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="manage">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Filter by Category</label>
            <Select value={selectedProduct || ""} onValueChange={(value) => setSelectedProduct(value || null)}>
              <SelectTrigger className="w-full md:w-72">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {productCategories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.productCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 border rounded-lg">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManagement;
