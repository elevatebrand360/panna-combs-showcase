export interface ImageOptimizationOptions {
  maxSizeMB: number;
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio?: boolean;
}

export interface OptimizedImage {
  file: File;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  width: number;
  height: number;
}

/**
 * Optimizes an image file to reduce its size while maintaining quality
 * @param file - The original image file
 * @param options - Optimization options
 * @returns Promise<OptimizedImage> - The optimized image with metadata
 */
export async function optimizeImage(
  file: File,
  options: Partial<ImageOptimizationOptions> = {}
): Promise<OptimizedImage> {
  const defaultOptions: ImageOptimizationOptions = {
    maxSizeMB: 5,
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080,
    maintainAspectRatio: true,
    ...options
  };

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (defaultOptions.maxWidth && width > defaultOptions.maxWidth) {
          height = (height * defaultOptions.maxWidth) / width;
          width = defaultOptions.maxWidth;
        }
        
        if (defaultOptions.maxHeight && height > defaultOptions.maxHeight) {
          width = (width * defaultOptions.maxHeight) / height;
          height = defaultOptions.maxHeight;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas with new dimensions
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to blob with specified quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob from canvas'));
              return;
            }

            // Create new file with optimized data
            const optimizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            const originalSize = file.size;
            const optimizedSize = optimizedFile.size;
            const compressionRatio = ((originalSize - optimizedSize) / originalSize) * 100;

            resolve({
              file: optimizedFile,
              originalSize,
              optimizedSize,
              compressionRatio,
              width: Math.round(width),
              height: Math.round(height),
            });
          },
          file.type,
          defaultOptions.quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load image from file
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Optimizes an image to ensure it's under the specified size limit
 * @param file - The original image file
 * @param maxSizeMB - Maximum size in MB (default: 5)
 * @returns Promise<OptimizedImage> - The optimized image
 */
export async function optimizeImageToSize(
  file: File,
  maxSizeMB: number = 5
): Promise<OptimizedImage> {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  // If file is already under the limit, return as is
  if (file.size <= maxSizeBytes) {
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve({
          file,
          originalSize: file.size,
          optimizedSize: file.size,
          compressionRatio: 0,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Start with high quality and reduce if needed
  let quality = 0.9;
  let optimizedImage: OptimizedImage;

  while (quality > 0.1) {
    try {
      optimizedImage = await optimizeImage(file, { quality, maxSizeMB });
      
      // If we're under the limit, we're done
      if (optimizedImage.optimizedSize <= maxSizeBytes) {
        return optimizedImage;
      }
      
      // Reduce quality and try again
      quality -= 0.1;
    } catch (error) {
      quality -= 0.1;
    }
  }

  // If we still can't get under the limit, try reducing dimensions
  try {
    return await optimizeImage(file, { 
      quality: 0.7, 
      maxSizeMB,
      maxWidth: 1200,
      maxHeight: 800 
    });
  } catch (error) {
    // Final attempt with aggressive compression
    try {
      return await optimizeImage(file, { 
        quality: 0.5, 
        maxSizeMB,
        maxWidth: 800,
        maxHeight: 600 
      });
    } catch (finalError) {
      throw new Error(`Failed to optimize image to under ${maxSizeMB}MB. Original size: ${formatFileSize(file.size)}`);
    }
  }
}

/**
 * Validates if a file is a valid image
 * @param file - The file to validate
 * @returns boolean - True if valid image
 */
export function isValidImageFile(file: File): boolean {
  if (!file) return false;
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Gets image dimensions from a file
 * @param file - The image file
 * @returns Promise<{width: number, height: number}> - Image dimensions
 */
export function getImageDimensions(file: File): Promise<{width: number, height: number}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Formats file size in human readable format
 * @param bytes - Size in bytes
 * @returns string - Formatted size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
