import { useState, useEffect, useCallback } from 'react';

interface MobileOptimizationConfig {
  enableImageOptimization: boolean;
  enableLazyLoading: boolean;
  enableTouchOptimization: boolean;
  enableScrollOptimization: boolean;
}

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Configuration for mobile optimizations
  const config: MobileOptimizationConfig = {
    enableImageOptimization: true,
    enableLazyLoading: true,
    enableTouchOptimization: true,
    enableScrollOptimization: true,
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /mobile|android|iphone|ipad|phone/i.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect low-end device
  useEffect(() => {
    const checkLowEndDevice = () => {
      const memory = (navigator as any).deviceMemory || 4;
      const cores = (navigator as any).hardwareConcurrency || 4;
      const isLowEnd = memory < 4 || cores < 4;
      setIsLowEndDevice(isLowEnd);
    };

    checkLowEndDevice();
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

  return {
    isMobile,
    isLowEndDevice,
    optimizeImage,
    shouldLazyLoad,
    enableTouchOptimization,
    enableScrollOptimization,
    config,
  };
}; 