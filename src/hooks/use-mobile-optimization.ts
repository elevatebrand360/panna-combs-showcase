import { useEffect, useState, useCallback } from 'react';

interface MobileOptimizationConfig {
  enableLazyLoading: boolean;
  enableImageOptimization: boolean;
  enableTouchOptimization: boolean;
  enableScrollOptimization: boolean;
}

export const useMobileOptimization = (config: MobileOptimizationConfig = {
  enableLazyLoading: true,
  enableImageOptimization: true,
  enableTouchOptimization: true,
  enableScrollOptimization: true
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect low-end devices
  useEffect(() => {
    const checkLowEndDevice = () => {
      const memory = (navigator as any).deviceMemory || 4;
      const cores = (navigator as any).hardwareConcurrency || 4;
      const isLowEnd = memory < 4 || cores < 4;
      setIsLowEndDevice(isLowEnd);
    };

    checkLowEndDevice();
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Optimize images for mobile
  const optimizeImage = useCallback((src: string, width: number = 400) => {
    if (!config.enableImageOptimization || !isMobile) return src;
    
    // Add width parameter for responsive images
    if (src.includes('firebasestorage.googleapis.com')) {
      return `${src}?alt=media&w=${width}`;
    }
    
    return src;
  }, [isMobile, config.enableImageOptimization]);

  // Lazy loading for mobile
  const shouldLazyLoad = useCallback(() => {
    return config.enableLazyLoading && (isMobile || isLowEndDevice);
  }, [isMobile, isLowEndDevice, config.enableLazyLoading]);

  // Touch optimization
  const enableTouchOptimization = useCallback(() => {
    if (!config.enableTouchOptimization) return;

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    const preventZoom = (e: TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventZoom, false);
    return () => document.removeEventListener('touchend', preventZoom);
  }, [config.enableTouchOptimization]);

  // Scroll optimization
  const enableScrollOptimization = useCallback(() => {
    if (!config.enableScrollOptimization) return;

    // Optimize scroll performance
    const optimizeScroll = () => {
      (document.body.style as any).webkitOverflowScrolling = 'touch';
    };

    optimizeScroll();
  }, [config.enableScrollOptimization]);

  // Memory management for mobile
  const cleanupMemory = useCallback(() => {
    if (isMobile || isLowEndDevice) {
      // Clear image cache periodically
      const clearImageCache = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.classList.contains('critical-image')) {
            img.src = '';
          }
        });
      };

      // Clear cache every 5 minutes on low-end devices
      if (isLowEndDevice) {
        setInterval(clearImageCache, 5 * 60 * 1000);
      }
    }
  }, [isMobile, isLowEndDevice]);

  // Apply optimizations
  useEffect(() => {
    if (isMobile) {
      const touchCleanup = enableTouchOptimization();
      enableScrollOptimization();
      cleanupMemory();

      return () => {
        if (touchCleanup) touchCleanup();
      };
    }
  }, [isMobile, enableTouchOptimization, enableScrollOptimization, cleanupMemory]);

  return {
    isMobile,
    isLowEndDevice,
    isOnline,
    optimizeImage,
    shouldLazyLoad,
    mobileConfig: {
      imageQuality: isLowEndDevice ? 'low' : 'medium',
      animationReduced: isLowEndDevice,
      lazyLoadEnabled: shouldLazyLoad(),
      touchOptimized: config.enableTouchOptimization
    }
  };
}; 