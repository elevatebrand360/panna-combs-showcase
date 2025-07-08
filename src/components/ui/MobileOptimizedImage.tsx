import React, { useState, useEffect, useRef } from 'react';
import { useMobileOptimization } from '@/hooks/use-mobile-optimization';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const MobileOptimizedImage: React.FC<MobileOptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width = 400,
  height,
  priority = false,
  fallbackSrc = '/placeholder-image.jpg',
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { isMobile, isLowEndDevice, optimizeImage, shouldLazyLoad } = useMobileOptimization();

  // Optimize image source for mobile
  const optimizedSrc = optimizeImage(imageSrc, width);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!shouldLazyLoad() || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLazyLoad, priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    
    onError?.();
  };

  // Preload critical images
  useEffect(() => {
    if (priority && isMobile) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, isMobile, optimizedSrc]);

  // Memory optimization for low-end devices
  useEffect(() => {
    if (isLowEndDevice && !priority) {
      const cleanup = () => {
        if (imgRef.current && !isInView) {
          imgRef.current.src = '';
        }
      };

      const timeout = setTimeout(cleanup, 30000); // 30 seconds
      return () => clearTimeout(timeout);
    }
  }, [isLowEndDevice, priority, isInView]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? optimizedSrc : ''}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${isLowEndDevice ? 'critical-image' : ''}`}
        loading={shouldLazyLoad() && !priority ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          // Prevent layout shift
          aspectRatio: height && width ? `${width}/${height}` : undefined,
          // Optimize for mobile
          ...(isMobile && {
            willChange: 'auto',
            transform: 'translateZ(0)'
          })
        }}
      />
    </div>
  );
};

export default MobileOptimizedImage; 