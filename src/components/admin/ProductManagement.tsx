import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { productCategories } from "@/lib/products";
import { AlertCircle, Upload, FileImage } from "lucide-react";
import { uploadImage, addProduct, getProducts, deleteProduct } from "@/lib/firebase-crud";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { optimizeImageToSize, isValidImageFile, formatFileSize } from "@/utils/imageOptimizer";

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
  const [imageOptimizationInfo, setImageOptimizationInfo] = useState<Array<{
    originalSize: string;
    optimizedSize: string;
    compressionRatio: number;
    isOptimizing: boolean;
  }>>([
    { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false },
    { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false },
    { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false },
    { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
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
    setNewProduct(prev => ({ ...prev, category: value }));
  };

  const validateImageFile = (file: File | null): boolean => {
    if (!file) return false;
    return isValidImageFile(file);
  };

  const handleImageFileChange = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    
    if (!file) {
      // Clear the image slot
      const updatedFiles = [...imageFiles];
      updatedFiles[index] = null;
      const updatedErrors = [...imageErrors];
      updatedErrors[index] = false;
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = "";
      const updatedOptimizationInfo = [...imageOptimizationInfo];
      updatedOptimizationInfo[index] = { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false };
      
      setImageFiles(updatedFiles);
      setImageErrors(updatedErrors);
      setImagePreviews(updatedPreviews);
      setImageOptimizationInfo(updatedOptimizationInfo);
      return;
    }

    const isValid = validateImageFile(file);
    if (!isValid) {
      const updatedErrors = [...imageErrors];
      updatedErrors[index] = true;
      setImageErrors(updatedErrors);
      return;
    }

    // Set optimizing state
    const updatedOptimizationInfo = [...imageOptimizationInfo];
    updatedOptimizationInfo[index] = { 
      ...updatedOptimizationInfo[index], 
      isOptimizing: true,
      originalSize: formatFileSize(file.size)
    };
    setImageOptimizationInfo(updatedOptimizationInfo);

    try {
      // Optimize the image
      const optimizedImage = await optimizeImageToSize(file, 5);
      
      // Update files and previews
      const updatedFiles = [...imageFiles];
      updatedFiles[index] = optimizedImage.file;
      
      const updatedPreviews = [...imagePreviews];
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPreviews[index] = reader.result as string;
        setImagePreviews(updatedPreviews);
      };
      reader.readAsDataURL(optimizedImage.file);

      // Update optimization info
      updatedOptimizationInfo[index] = {
        originalSize: formatFileSize(optimizedImage.originalSize),
        optimizedSize: formatFileSize(optimizedImage.optimizedSize),
        compressionRatio: optimizedImage.compressionRatio,
        isOptimizing: false
      };

      // Clear any previous errors
      const updatedErrors = [...imageErrors];
      updatedErrors[index] = false;

      setImageFiles(updatedFiles);
      setImageErrors(updatedErrors);
      setImageOptimizationInfo(updatedOptimizationInfo);

      // Show optimization success toast
      if (optimizedImage.compressionRatio > 0) {
        toast({
          title: "Image optimized",
          description: `Image compressed by ${optimizedImage.compressionRatio.toFixed(1)}% (${formatFileSize(optimizedImage.originalSize)} → ${formatFileSize(optimizedImage.optimizedSize)})`,
        });
      }
    } catch (error) {
      console.error('Image optimization failed:', error);
      
      // Fallback to original file if optimization fails
      const updatedFiles = [...imageFiles];
      updatedFiles[index] = file;
      
      const updatedPreviews = [...imagePreviews];
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPreviews[index] = reader.result as string;
        setImagePreviews(updatedPreviews);
      };
      reader.readAsDataURL(file);

      // Update optimization info
      updatedOptimizationInfo[index] = {
        originalSize: formatFileSize(file.size),
        optimizedSize: formatFileSize(file.size),
        compressionRatio: 0,
        isOptimizing: false
      };

      const updatedErrors = [...imageErrors];
      updatedErrors[index] = false;

      setImageFiles(updatedFiles);
      setImageErrors(updatedErrors);
      setImageOptimizationInfo(updatedOptimizationInfo);

      toast({
        title: "Image optimization failed",
        description: "Using original image. Please ensure image is under 5MB.",
        variant: "destructive"
      });
    }
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
    if (imageFiles.filter((file) => file !== null).length < 1) {
      toast({
        title: "Missing image",
        description: "Please upload at least one product image.",
        variant: "destructive"
      });
      return;
    }
    if (imageFiles.some((file) => file && !validateImageFile(file))) {
      toast({
        title: "Invalid image files",
        description: "Please provide only JPG, PNG, or WebP images.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const uploadedImageUrls: string[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        if (imageFiles[i]) {
          const url = await uploadImage(imageFiles[i]!);
          uploadedImageUrls[i] = url;
        } else {
          uploadedImageUrls[i] = "";
        }
      }
      const slug = generateSlug(newProduct.name);
      const product = {
        ...newProduct,
        imageUrls: uploadedImageUrls,
        slug,
        date: new Date().toISOString()
      };
      await addProduct(product);
      toast({
        title: "Product added",
        description: `${product.name} has been added successfully`
      });
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
      setImageOptimizationInfo([
        { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false },
        { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false },
        { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false },
        { originalSize: "", optimizedSize: "", compressionRatio: 0, isOptimizing: false }
      ]);
      await loadProducts();
    } catch (error) {
      toast({
        title: "Error adding product",
        description: error instanceof Error ? error.message : "An error occurred while uploading images or saving product data",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      await handleDeleteProduct(productToDelete);
      setProductToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: "Product deleted",
        description: "Product has been removed successfully"
      });
      await loadProducts();
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: error instanceof Error ? error.message : "An error occurred while deleting the product",
        variant: "destructive"
      });
    }
  };

  // Get all unique, non-empty, trimmed categories from products
  const allCategories = Array.from(
    new Set(
      products
        .map(p => (typeof p.category === 'string' ? p.category.trim() : ''))
        .filter(name => typeof name === 'string' && name.trim().length > 0)
    )
  );

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category && p.category.trim() === selectedCategory)
    : products;

  // Get fixed categories from productCategories
  const fixedCategories = productCategories.map(c => c.name).filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="mr-2 mb-2"
        >
          All Categories ({products.length})
        </Button>
        {allCategories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="mr-2 mb-2"
          >
            {category} ({products.filter(p => p.category && p.category.trim() === category).length})
          </Button>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">{selectedCategory ? `Products in "${selectedCategory}"` : "All Products"}</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="border rounded-lg p-4 flex flex-col">
                <div className="mb-2 font-bold text-gray-900">{product.name}</div>
                <div className="mb-2 text-sm text-gray-500">Category: {product.category}</div>
                <div className="mb-2 text-sm text-gray-500">Code: {product.productCode}</div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {product.imageUrls && product.imageUrls.map((url: string, i: number) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Product ${index + 1} Image ${i + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(product.id)}
                  className="mt-auto"
                >
                  Delete Product
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-gray-600">No products found</p>
          </div>
        )}
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

      <div className="border-t pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Add Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Product Name</label>
            <Input
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Product Code</label>
            <Input
              name="productCode"
              value={newProduct.productCode}
              onChange={handleInputChange}
              placeholder="Enter product code (e.g. PC001)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Category</label>
            <Select value={newProduct.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {fixedCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">Description</label>
          <Textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-900">
            Product Images (at least 1 required - JPG, PNG, or WebP only)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="relative">
                  <div className={`border-2 ${imageErrors[index] ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md p-6 flex flex-col items-center justify-center hover:border-primary transition-colors`}>
                    {imageOptimizationInfo[index].isOptimizing ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
                        <span className="text-sm text-primary">Optimizing...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className={`${imageFiles[index] ? 'text-primary' : 'text-gray-400'} mb-2`} size={24} />
                        <label htmlFor={`image-${index}`} className="cursor-pointer text-center">
                          <span className="text-sm font-medium text-primary block">Upload image {index + 1}</span>
                          <span className="text-xs text-gray-600 block mt-1">JPG, PNG, or WebP only</span>
                          <span className="text-xs text-gray-600 block mt-1">Auto-optimized to &lt;5MB</span>
                        </label>
                      </>
                    )}
                    <input
                      id={`image-${index}`}
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => handleImageFileChange(index, e)}
                      disabled={imageOptimizationInfo[index].isOptimizing}
                    />
                  </div>
                  {imageErrors[index] && (
                    <div className="absolute right-2 top-2 text-red-500">
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>
                {imageErrors[index] && (
                  <p className="text-xs text-red-500">JPG, PNG, or WebP format only</p>
                )}
                {imagePreviews[index] && (
                  <div className="space-y-2">
                    <div className="h-24 w-full bg-gray-100 rounded overflow-hidden">
                      <img
                        src={imagePreviews[index]}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {imageOptimizationInfo[index].originalSize && (
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Original:</span>
                          <span>{imageOptimizationInfo[index].originalSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Optimized:</span>
                          <span className="text-green-600 font-medium">{imageOptimizationInfo[index].optimizedSize}</span>
                        </div>
                        {imageOptimizationInfo[index].compressionRatio > 0 && (
                          <div className="flex justify-between">
                            <span>Compression:</span>
                            <span className="text-green-600 font-medium">
                              {imageOptimizationInfo[index].compressionRatio.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleAddProduct} disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
