import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Upload an image to Firebase Storage and return its public download URL
export async function uploadImage(file: File): Promise<string> {
  try {
    console.log("Starting image upload for:", file.name, "Size:", file.size);
    
    // Check file size (5MB limit for client SDK)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size exceeds 5MB limit");
    }
    
    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    console.log("Uploading to storage path:", storageRef.fullPath);
    
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload successful, getting download URL...");
    
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL obtained:", downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error("Image upload failed:", error);
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
  try {
    console.log("Adding product to Firestore:", product);
    
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    console.log("Product added successfully with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
}

// Get all products from Firestore
export async function getProducts() {
  try {
    console.log("Fetching products from Firestore...");
    
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log("Products fetched successfully:", products.length, "products");
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

// Delete a product from Firestore
export async function deleteProduct(id: string) {
  try {
    console.log("Deleting product with ID:", id);
    
    await deleteDoc(doc(db, "products", id));
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
} 