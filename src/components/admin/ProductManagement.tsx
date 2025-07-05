import { useState, useEffect, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { productCategories } from "@/lib/products";
import { AlertCircle, Upload } from "lucide-react";
import { uploadImage, addProduct, getProducts, deleteProduct } from "@/lib/firebase-crud";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

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
  
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [imageErrors, setImageErrors] = useState<boolean[]>([false, false, false, false]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", "", ""]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Load products from Firestore
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast({
        title: "Error loading products",
        description: "Failed to load products from database",
        variant: "destructive"
      });
    }
  };

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

  const isValidImageFile = (file: File | null): boolean => {
    if (!file) return false;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
  };

  const handleImageFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;

    // Update error state for this image
    const isValid = isValidImageFile(file);
    const updatedErrors = [...imageErrors];
    updatedErrors[index] = !isValid && file !== null;
    
    // Create preview URL
    const updatedPreviews = [...imagePreviews];
    if (file && isValid) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPreviews[index] = reader.result as string;
        setImagePreviews(updatedPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      updatedPreviews[index] = "";
    }
    
    setImageFiles(updatedFiles);
    setImageErrors(updatedErrors);
    setImagePreviews(updatedPreviews);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.category || !newProduct.productCode) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if all images are provided and valid
    if (imageFiles.some((file) => file === null)) {
      toast({
        title: "Missing images",
        description: "Please provide all four images",
        variant: "destructive"
      });
      return;
    }

    if (imageFiles.some((file) => !isValidImageFile(file))) {
      toast({
        title: "Invalid image files",
        description: "Please provide all images in JPG or PNG format only",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      console.log("Starting product addition process...");
      
      // Upload all images to Firebase Storage and get URLs
      const uploadedImageUrls: string[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        if (imageFiles[i]) {
          console.log(`Uploading image ${i + 1}...`);
          const url = await uploadImage(imageFiles[i]!);
          uploadedImageUrls[i] = url;
          console.log(`Image ${i + 1} uploaded successfully:`, url);
        }
      }

      const slug = generateSlug(newProduct.name);
      const product = {
        ...newProduct,
        imageUrls: uploadedImageUrls,
        slug,
        date: new Date().toISOString()
      };

      console.log("Submitting product data:", product);
      await addProduct(product);

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
      setImageFiles([null, null, null, null]);
      setImageErrors([false, false, false, false]);
      setImagePreviews(["", "", "", ""]);

      // Refresh products from Firestore
      await loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error adding product",
        description: error instanceof Error ? error.message : "An error occurred while uploading images or saving product data",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

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
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative">
                    <div className={`border-2 ${imageErrors[index] ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md p-6 flex flex-col items-center justify-center hover:border-primary transition-colors`}>
                      <Upload className={`${imageFiles[index] ? 'text-primary' : 'text-gray-400'} mb-2`} size={24} />
                      <label htmlFor={`image-${index}`} className="cursor-pointer text-center">
                        <span className="text-sm font-medium text-primary block">Upload image {index + 1}</span>
                        <span className="text-xs text-muted-foreground block mt-1">JPG or PNG only</span>
                      </label>
                      <input
                        id={`image-${index}`}
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={(e) => handleImageFileChange(index, e)}
                      />
                    </div>
                    {imageErrors[index] && (
                      <div className="absolute right-2 top-2 text-red-500">
                        <AlertCircle size={16} />
                      </div>
                    )}
                  </div>
                  {imageErrors[index] && (
                    <p className="text-xs text-red-500">JPG or PNG format only</p>
                  )}
                  {imagePreviews[index] && (
                    <div className="h-24 w-full bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={imagePreviews[index]} 
                        alt={`Preview ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleAddProduct} disabled={loading}>
              {loading ? "Adding Product..." : "Add Product"}
            </Button>
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
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDeleteProduct} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
