// Performance monitoring and optimization utilities

export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

// Performance monitoring class
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
  };

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Monitor page load performance
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.capturePageLoadMetrics();
      });

      // Monitor Core Web Vitals
      this.monitorCoreWebVitals();
      
      // Monitor navigation performance
      this.monitorNavigationPerformance();
    }
  }

  private capturePageLoadMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      console.log('Page Load Performance:', {
        pageLoadTime: `${this.metrics.pageLoadTime}ms`,
        domContentLoaded: `${this.metrics.domContentLoaded}ms`,
        url: window.location.href
      });
    }
  }

  private monitorCoreWebVitals() {
    // Monitor First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
            console.log('First Contentful Paint:', `${entry.startTime}ms`);
          }
        });
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP monitoring not supported');
      }

      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
        console.log('Largest Contentful Paint:', `${lastEntry.startTime}ms`);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP monitoring not supported');
      }

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Type assertion for layout shift entry
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
          }
        }
        this.metrics.cumulativeLayoutShift = clsValue;
        console.log('Cumulative Layout Shift:', clsValue);
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS monitoring not supported');
      }

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Type assertion for first input entry
          const firstInputEntry = entry as PerformanceEntry & { processingStart?: number };
          if (firstInputEntry.processingStart) {
            this.metrics.firstInputDelay = firstInputEntry.processingStart - firstInputEntry.startTime;
            console.log('First Input Delay:', `${this.metrics.firstInputDelay}ms`);
          }
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID monitoring not supported');
      }
    }
  }

  private monitorNavigationPerformance() {
    // Monitor React Router navigation performance
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      const startTime = performance.now();
      const result = originalPushState.apply(this, args);
      
      setTimeout(() => {
        const endTime = performance.now();
        console.log('Navigation Performance (pushState):', `${endTime - startTime}ms`);
      }, 0);
      
      return result;
    };

    history.replaceState = function(...args) {
      const startTime = performance.now();
      const result = originalReplaceState.apply(this, args);
      
      setTimeout(() => {
        const endTime = performance.now();
        console.log('Navigation Performance (replaceState):', `${endTime - startTime}ms`);
      }, 0);
      
      return result;
    };
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logPerformanceReport() {
    console.log('=== Performance Report ===');
    console.log('Page Load Time:', `${this.metrics.pageLoadTime}ms`);
    console.log('DOM Content Loaded:', `${this.metrics.domContentLoaded}ms`);
    console.log('First Contentful Paint:', `${this.metrics.firstContentfulPaint}ms`);
    console.log('Largest Contentful Paint:', `${this.metrics.largestContentfulPaint}ms`);
    console.log('Cumulative Layout Shift:', this.metrics.cumulativeLayoutShift);
    console.log('First Input Delay:', `${this.metrics.firstInputDelay}ms`);
    console.log('========================');
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Performance optimization utilities
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    // Add loading="lazy" to images below the fold
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add error handling
    img.addEventListener('error', () => {
      img.src = '/placeholder.svg';
    });
  });
};

export const preloadCriticalResources = () => {
  // Preload critical CSS and JS
  const criticalResources = [
    '/assets/index.css',
    '/assets/index.js'
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
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