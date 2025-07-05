import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9wWcFdQWpCaLIMOOJZb_GqTgvOFgbsws",
  authDomain: "panna-combs-7963b.firebaseapp.com",
  projectId: "panna-combs-7963b",
  storageBucket: "panna-combs-7963b.firebasestorage.app",
  messagingSenderId: "621714091749",
  appId: "1:621714091749:web:6885e7d4d3b69dcacfae0c",
  measurementId: "G-986PBJG446"
};

const app = initializeApp(firebaseConfig);

// Initialize analytics only in production
let analytics;
if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

// Initialize Firestore
const db = initializeFirestore(app, { 
  // e.g., host: "your-region-firestore.googleapis.com", ssl: true 
});

// Only connect to emulator in development and only if emulator is running
if (window.location.hostname === "localhost") {
  try {
    connectFirestoreEmulator(db, "localhost", 8080);
    console.log("Connected to Firestore emulator");
  } catch (error) {
    console.log("Firestore emulator not running, using production Firestore");
  }
}

const storage = getStorage(app);

export { app, analytics, db, storage };

async function uploadImage(file: File) {
  try {
    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}
