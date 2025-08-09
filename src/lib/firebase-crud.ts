import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
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