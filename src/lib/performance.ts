// Performance monitoring utility
export const initPerformanceMonitoring = () => {
  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      
      if (lastEntry.startTime > 2500) {
        console.warn('LCP is slow:', lastEntry.startTime);
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEventTiming;
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        
        if (fidEntry.processingStart - fidEntry.startTime > 100) {
          console.warn('FID is slow:', fidEntry.processingStart - fidEntry.startTime);
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
      
      if (clsValue > 0.1) {
        console.warn('CLS is poor:', clsValue);
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log('Page load time:', loadTime);
    
    if (loadTime > 3000) {
      console.warn('Page load is slow:', loadTime);
    }
  });
};

// Track custom metrics
export const trackCustomMetric = (name: string, value: number) => {
  if ('performance' in window) {
    performance.mark(`${name}-start`);
    performance.measure(name, `${name}-start`);
    
    const measure = performance.getEntriesByName(name)[0];
    console.log(`${name}:`, measure.duration);
  }
}; 