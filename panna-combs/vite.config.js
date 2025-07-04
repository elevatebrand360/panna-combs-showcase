import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default defineConfig({
    plugins: [
        react(),
    ],
});
