import { perf } from './firebase';
import { trace } from 'firebase/performance';

// Performance monitoring and optimization utilities
export const performanceMonitor = {
  startTime: performance.now(),
  marks: new Map<string, number>(),
  
  mark(name: string) {
    this.marks.set(name, performance.now());
    performance.mark(name);
  },
  
  measure(name: string, startMark: string, endMark: string) {
    try {
      performance.measure(name, startMark, endMark);
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  },
  
  logPerformanceReport() {
    const loadTime = performance.now() - this.startTime;
    console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
    
    // Log Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
          }
          if (entry.entryType === 'first-input-delay') {
            const fidEntry = entry as PerformanceEntry & { processingStart?: number };
            if (fidEntry.processingStart) {
              console.log(`FID: ${fidEntry.processingStart - entry.startTime}ms`);
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input-delay'] });
    }
  }
};

// Firebase Performance trace utilities
export const createPerformanceTrace = (traceName: string) => {
  if (perf) {
    try {
      const performanceTrace = trace(perf, traceName);
      return {
        start: () => performanceTrace.start(),
        stop: () => performanceTrace.stop(),
        putAttribute: (key: string, value: string) => performanceTrace.putAttribute(key, value),
        putMetric: (metricName: string, value: number) => performanceTrace.putMetric(metricName, value)
      };
    } catch (error) {
      console.warn('Failed to create performance trace:', error);
      return {
        start: () => {},
        stop: () => {},
        putAttribute: () => {},
        putMetric: () => {}
      };
    }
  }
  return {
    start: () => {},
    stop: () => {},
    putAttribute: () => {},
    putMetric: () => {}
  };
};

// Track image loading performance
export const trackImageLoad = (imageUrl: string, loadTime: number) => {
  const imageTrace = createPerformanceTrace('image_load');
  imageTrace.start();
  imageTrace.putAttribute('image_url', imageUrl);
  imageTrace.putMetric('load_time_ms', loadTime);
  imageTrace.stop();
};

// Track page load performance
export const trackPageLoad = (pageName: string, loadTime: number) => {
  const pageTrace = createPerformanceTrace('page_load');
  pageTrace.start();
  pageTrace.putAttribute('page_name', pageName);
  pageTrace.putMetric('load_time_ms', loadTime);
  pageTrace.stop();
};

// Track Firebase operations
export const trackFirebaseOperation = (operation: string, duration: number) => {
  const firebaseTrace = createPerformanceTrace('firebase_operation');
  firebaseTrace.start();
  firebaseTrace.putAttribute('operation', operation);
  firebaseTrace.putMetric('duration_ms', duration);
  firebaseTrace.stop();
};

// Aggressive image preloading for instant loading
export const preloadImages = (imageUrls: string[]) => {
  const preloadTrace = createPerformanceTrace('image_preload');
  preloadTrace.start();
  
  imageUrls.forEach((url, index) => {
    if (url && url !== '/placeholder-product.svg') {
      const startTime = performance.now();
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const loadTime = performance.now() - startTime;
        console.log(`Preloaded image ${index + 1}: ${url} (${loadTime.toFixed(2)}ms)`);
        trackImageLoad(url, loadTime);
      };
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
      };
    }
  });
  
  preloadTrace.stop();
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalTrace = createPerformanceTrace('critical_resources_preload');
  criticalTrace.start();
  
  // Preload placeholder image
  const placeholderImg = new Image();
  placeholderImg.src = '/placeholder-product.svg';
  
  // Preload common UI images
  const criticalImages = [
    '/placeholder-product.svg',
    // Add other critical images here
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  criticalTrace.stop();
};

// Performance optimization utilities
export const optimizeImages = () => {
  const optimizeTrace = createPerformanceTrace('image_optimization');
  optimizeTrace.start();
  
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    // Force eager loading for all images
    img.setAttribute('loading', 'eager');
    
    // Add error handling
    img.addEventListener('error', () => {
      img.src = '/placeholder-product.svg';
    });
    
    // Optimize for instant display
    img.style.transition = 'opacity 0.1s ease-in-out';
  });
  
  optimizeTrace.stop();
};

// Preload all product images from Firebase
export const preloadProductImages = async (getProducts: () => Promise<any[]>) => {
  const productImagesTrace = createPerformanceTrace('product_images_preload');
  productImagesTrace.start();
  
  try {
    const products = await getProducts();
    const allImageUrls: string[] = [];
    
    products.forEach((product: any) => {
      if (product.imageUrls && Array.isArray(product.imageUrls)) {
        product.imageUrls.forEach((url: string) => {
          if (url && url !== '/placeholder-product.svg') {
            allImageUrls.push(url);
          }
        });
      }
      if (product.image && product.image !== '/placeholder-product.svg') {
        allImageUrls.push(product.image);
      }
    });
    
    // Preload all images in parallel
    preloadImages(allImageUrls);
    
    productImagesTrace.putMetric('total_images', allImageUrls.length);
    console.log(`Preloading ${allImageUrls.length} product images`);
  } catch (error) {
    console.warn('Failed to preload product images:', error);
    productImagesTrace.putAttribute('error', error instanceof Error ? error.message : 'Unknown error');
  } finally {
    productImagesTrace.stop();
  }
};

// Optimize for instant loading
export const optimizeForInstantLoading = () => {
  const instantLoadingTrace = createPerformanceTrace('instant_loading_optimization');
  instantLoadingTrace.start();
  
  // Disable lazy loading for all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('loading', 'eager');
    img.removeAttribute('loading');
  });
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Optimize image loading
  optimizeImages();
  
  instantLoadingTrace.stop();
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}; 