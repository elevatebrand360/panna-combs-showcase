import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, Timestamp, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll, getMetadata } from "firebase/storage";
import { trackFirebaseOperation } from "./performance";

// Cache for products to avoid repeated fetches
let productsCache: any[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Upload an image to Firebase Storage and return its public download URL
export async function uploadImage(file: File): Promise<string> {
  const startTime = performance.now();
  
  try {
    console.log("Starting image upload for:", file.name, "Size:", file.size, "Type:", file.type);
    // Extra validation
    if (!(file instanceof File)) {
      throw new Error("Provided object is not a File instance");
    }
    // File size is now handled by frontend optimization
    // Images are guaranteed to be under 5MB before reaching this function
    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Invalid file type: " + file.type);
    }
    
    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    console.log("Uploading to storage path:", storageRef.fullPath);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload successful, getting download URL...");
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL obtained:", downloadURL);
    
    // Clear cache when new image is uploaded
    productsCache = null;
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('image_upload', duration);
    
    return downloadURL;
  } catch (error) {
    console.error("Image upload failed:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('image_upload_error', duration);
    throw error;
  }
}

// Add a product to Firestore with the imageUrl
export async function addProduct(product: { 
  name: string; 
  description: string;
  category: string;
  productCode: string;
  imageUrls: string[];
  slug: string;
  date: string;
}) {
  const startTime = performance.now();
  
  try {
    console.log("Adding product to Firestore:", product);
    
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    console.log("Product added successfully with ID:", docRef.id);
    
    // Clear cache when new product is added
    productsCache = null;
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('add_product', duration);
    
    return docRef;
  } catch (error) {
    console.error("Failed to add product:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('add_product_error', duration);
    throw error;
  }
}

// Get all products from Firestore with caching
export async function getProducts() {
  const startTime = performance.now();
  
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (productsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log("Returning cached products:", productsCache.length, "products");
      const duration = performance.now() - startTime;
      trackFirebaseOperation('get_products_cached', duration);
      return productsCache;
    }
    
    console.log("Fetching products from Firestore...");
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    // Update cache
    productsCache = products;
    cacheTimestamp = now;
    
    console.log("Products fetched successfully:", products.length, "products");
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_products', duration);
    
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_products_error', duration);
    throw error;
  }
}

// Clear the products cache
export function clearProductsCache() {
  productsCache = null;
  cacheTimestamp = 0;
}

// Delete a product from Firestore
export async function deleteProduct(id: string) {
  const startTime = performance.now();
  
  try {
    console.log("Deleting product with ID:", id);
    const productDocRef = doc(db, "products", id);
    console.log("Deleting product with doc ref:", productDocRef.path);

    console.log("Attempting to delete product with ID:", id);
    await deleteDoc(productDocRef);
    console.log("Product deleted successfully");
    
    // Clear cache when product is deleted
    productsCache = null;
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('delete_product', duration);
  } catch (error) {
    console.error("Failed to delete product:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('delete_product_error', duration);
    throw error;
  }
}

// Image Management Functions

export interface ImageMetadata {
  id: string;
  name: string;
  url: string;
  category: string;
  size: number;
  type: string;
  uploadedAt: Date;
  productId?: string;
  storagePath: string;
}

// Get all images from Firebase Storage with metadata
export async function getAllImages(): Promise<ImageMetadata[]> {
  const startTime = performance.now();
  
  try {
    console.log("Fetching all images from storage...");
    
    // Get all products to map images to categories
    const products = await getProducts();
    const imageMap = new Map<string, { category: string; productId: string }>();
    
    products.forEach(product => {
      if (product.imageUrls && Array.isArray(product.imageUrls)) {
        product.imageUrls.forEach(url => {
          if (url) {
            imageMap.set(url, { 
              category: product.category || 'Uncategorized', 
              productId: product.id 
            });
          }
        });
      }
    });

    // List all files in the images folder
    const imagesRef = ref(storage, 'images');
    const result = await listAll(imagesRef);
    
    const images: ImageMetadata[] = [];
    
    for (const itemRef of result.items) {
      try {
        const url = await getDownloadURL(itemRef);
        
        // Get file metadata to get actual size
        const metadata = await itemRef.getMetadata();
        
        // Find category and product info
        const imageInfo = imageMap.get(url) || { category: 'Uncategorized', productId: undefined };
        
        images.push({
          id: itemRef.name,
          name: itemRef.name,
          url,
          category: imageInfo.category,
          size: metadata.size || 0, // Get actual file size from metadata
          type: metadata.contentType || 'image/*',
          uploadedAt: new Date(metadata.timeCreated || Date.now()),
          productId: imageInfo.productId,
          storagePath: itemRef.fullPath
        });
      } catch (error) {
        console.warn(`Failed to get metadata for ${itemRef.name}:`, error);
      }
    }
    
    // Sort by upload date (newest first)
    images.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_all_images', duration);
    
    console.log(`Successfully fetched ${images.length} images`);
    return images;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_all_images_error', duration);
    throw error;
  }
}

// Get images by category
export async function getImagesByCategory(category: string): Promise<ImageMetadata[]> {
  const startTime = performance.now();
  
  try {
    const allImages = await getAllImages();
    const filteredImages = allImages.filter(img => 
      img.category.toLowerCase() === category.toLowerCase()
    );
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_images_by_category', duration);
    
    return filteredImages;
  } catch (error) {
    console.error("Failed to fetch images by category:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_images_by_category_error', duration);
    throw error;
  }
}

// Delete an image from Firebase Storage
export async function deleteImage(imagePath: string): Promise<void> {
  const startTime = performance.now();
  
  try {
    console.log("Deleting image from storage:", imagePath);
    
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    
    console.log("Image deleted successfully from storage");
    
    // Clear cache when image is deleted
    productsCache = null;
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('delete_image', duration);
  } catch (error) {
    console.error("Failed to delete image:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('delete_image_error', duration);
    throw error;
  }
}

// Delete multiple images by category
export async function deleteImagesByCategory(category: string): Promise<number> {
  const startTime = performance.now();
  
  try {
    console.log(`Deleting all images in category: ${category}`);
    
    const images = await getImagesByCategory(category);
    let deletedCount = 0;
    
    for (const image of images) {
      try {
        await deleteImage(image.storagePath);
        deletedCount++;
      } catch (error) {
        console.warn(`Failed to delete image ${image.name}:`, error);
      }
    }
    
    console.log(`Successfully deleted ${deletedCount} images from category: ${category}`);
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('delete_images_by_category', duration);
    
    return deletedCount;
  } catch (error) {
    console.error("Failed to delete images by category:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('delete_images_by_category_error', duration);
    throw error;
  }
}

// Get image statistics
export async function getImageStats(): Promise<{
  totalImages: number;
  totalSize: number;
  categories: { [key: string]: { count: number; size: number } };
}> {
  const startTime = performance.now();
  
  try {
    const allImages = await getAllImages();
    
    const stats = {
      totalImages: allImages.length,
      totalSize: allImages.reduce((sum, img) => sum + img.size, 0),
      categories: {} as { [key: string]: { count: number; size: number } }
    };
    
    allImages.forEach(img => {
      if (!stats.categories[img.category]) {
        stats.categories[img.category] = { count: 0, size: 0 };
      }
      stats.categories[img.category].count++;
      stats.categories[img.category].size += img.size;
    });
    
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_image_stats', duration);
    
    return stats;
  } catch (error) {
    console.error("Failed to get image stats:", error);
    const duration = performance.now() - startTime;
    trackFirebaseOperation('get_image_stats_error', duration);
    throw error;
  }
}