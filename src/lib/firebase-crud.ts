import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Upload an image to Firebase Storage and return its public download URL
export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef); // This is a public URL
}

// Add a product to Firestore with the imageUrl
export async function addProduct(product: { name: string; price: number; imageUrl: string; }) {
  return await addDoc(collection(db, "products"), {
    ...product,
    createdAt: Timestamp.now(),
  });
}

// Get all products from Firestore
export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 