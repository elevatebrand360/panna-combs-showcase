import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Upload an image to Firebase Storage and return its public download URL
export async function uploadImage(file: File): Promise<string> {
  try {
    console.log("Starting image upload for:", file.name, "Size:", file.size, "Type:", file.type);
    // Extra validation
    if (!(file instanceof File)) {
      throw new Error("Provided object is not a File instance");
    }
    // Check file size (5MB limit for client SDK)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size exceeds 5MB limit");
    }
    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Invalid file type: " + file.type);
    }
    // Log first few bytes for debugging
    const arrayBuffer = await file.slice(0, 16).arrayBuffer();
    const bytes = Array.from(new Uint8Array(arrayBuffer));
    console.log("First 16 bytes of file:", bytes);
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
    console.log("Fetched products:", products);
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
    const productDocRef = doc(db, "products", id);
    console.log("Deleting product with doc ref:", productDocRef.path);

    console.log("Attempting to delete product with ID:", id);
    await deleteDoc(productDocRef);
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
}