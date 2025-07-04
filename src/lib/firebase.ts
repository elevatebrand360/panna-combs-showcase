import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9wWcFdQWpCaLIMOOJZb_GqTgvOFgbsws",
  authDomain: "panna-combs-7963b.firebaseapp.com",
  projectId: "panna-combs-7963b",
  storageBucket: "panna-combs-7963b.appspot.com",
  messagingSenderId: "621714091749",
  appId: "1:621714091749:web:6885e7d4d3b69dcacfae0c",
  measurementId: "G-986PBJG446"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Use this instead of getFirestore(app) if your region is not default:
const db = initializeFirestore(app, { 
  // e.g., host: "your-region-firestore.googleapis.com", ssl: true 
});
const storage = getStorage(app);

if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { app, analytics, db, storage };

async function uploadImage(file: File) {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}