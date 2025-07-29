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
  width = 150, // Use small width for previews
  height,
  priority = true, // Always prioritize for instant loading
  fallbackSrc = '/placeholder-product.svg',
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { isMobile, optimizeImage } = useMobileOptimization();

  // Optimize image source for mobile and use smallest size for preview
  const optimizedSrc = optimizeImage(imageSrc, width);

  // Preload image immediately
  useEffect(() => {
    if (optimizedSrc && optimizedSrc !== fallbackSrc) {
      const img = new window.Image();
      img.src = optimizedSrc;
    }
  }, [optimizedSrc, fallbackSrc]);

  // Handle image load
  const handleLoad = () => {
    setHasError(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      onError?.();
    }
  };

  // Update image source when src prop changes
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Error placeholder only if both main and fallback failed */}
      {hasError && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto object-cover ${hasError && imageSrc === fallbackSrc ? 'opacity-0' : 'opacity-100'}`}
        loading="eager"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          aspectRatio: height && width ? `${width}/${height}` : undefined,
          transition: 'none', // Remove transition delays
        }}
      />
    </div>
  );
};

export default MobileOptimizedImage; 