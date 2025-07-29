import React, { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import NetworkStatus from "@/components/NetworkStatus";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import CallPopup from "@/components/CallPopup";
import { performanceMonitor, optimizeForInstantLoading, preloadProductImages, trackPageLoad } from "@/lib/performance";
import { useToast } from "@/hooks/use-toast";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";
import { getProducts } from "@/lib/firebase-crud";

// Lazy load all pages with better error handling
const Index = lazy(() => import("./pages/Index").catch(() => ({ default: () => <div>Error loading page</div> })));
const About = lazy(() => import("./pages/About").catch(() => ({ default: () => <div>Error loading page</div> })));
const Products = lazy(() => import("./pages/Products").catch(() => ({ default: () => <div>Error loading page</div> })));
const AllProducts = lazy(() => import("./pages/AllProducts").catch(() => ({ default: () => <div>Error loading page</div> })));
const ProductCategory = lazy(() => import("./pages/ProductCategory").catch(() => ({ default: () => <div>Error loading page</div> })));
const ProductDetail = lazy(() => import("./pages/ProductDetail").catch(() => ({ default: () => <div>Error loading page</div> })));
const Contact = lazy(() => import("./pages/Contact").catch(() => ({ default: () => <div>Error loading page</div> })));
const NotFound = lazy(() => import("./pages/NotFound").catch(() => ({ default: () => <div>Error loading page</div> })));
const Admin = lazy(() => import("./pages/Admin").catch(() => ({ default: () => <div>Error loading page</div> })));
const NetworkDiagnostics = lazy(() => import("./pages/NetworkDiagnostics"));

// Loading component with performance optimization
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-DEFAULT mx-auto mb-4"></div>
      <p className="text-muted-foreground text-lg">Loading...</p>
    </div>
  </div>
);

// Performance optimization component
const PerformanceOptimizer = () => {
  useEffect(() => {
    // Apply instant loading optimizations immediately
    optimizeForInstantLoading();
    
    // Preload all product images in background
    preloadProductImages(getProducts);
    
    // Log performance report after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        performanceMonitor.logPerformanceReport();
      }, 1000);
    });
  }, []);

  return null;
};

// Page load tracker component
const PageLoadTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    const startTime = performance.now();
    
    const handlePageLoad = () => {
      const loadTime = performance.now() - startTime;
      const pageName = location.pathname || 'home';
      trackPageLoad(pageName, loadTime);
    };
    
    // Track page load after a short delay to allow for component mounting
    const timer = setTimeout(handlePageLoad, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return null;
};

// Create a client with optimized settings for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes - increased for better caching
      gcTime: 15 * 60 * 1000, // 15 minutes - increased for better caching
      retry: 2, // Increased retry attempts
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => {
  const { toast } = useToast();
  const { isMobile, isLowEndDevice } = useMobileOptimization();

  // Initialize mobile optimizations
  useEffect(() => {
    // Add mobile-specific meta tags
    if (isMobile) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    }

    // Optimize for low-end devices
    if (isLowEndDevice) {
      // Reduce animations
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      
      // Show performance warning
      toast({
        title: "Performance Mode",
        description: "Optimized for better performance on your device.",
        duration: 3000,
      });
    }
  }, [isMobile, isLowEndDevice, toast]);

  // Handle mobile-specific errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      
      // Prevent crashes on mobile
      if (isMobile) {
        event.preventDefault();
        
        toast({
          title: "Something went wrong",
          description: "Please try refreshing the page.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      if (isMobile) {
        event.preventDefault();
        
        toast({
          title: "Connection Error",
          description: "Please check your internet connection.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [isMobile, toast]);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <NetworkStatus />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <PerformanceOptimizer />
                <PageLoadTracker />
                <CallPopup />
                <WhatsAppPopup />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/all-products" element={<AllProducts />} />
                    <Route path="/category/:categorySlug" element={<ProductCategory />} />
                    <Route path="/products/:productSlug" element={<ProductDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/network-diagnostics" element={<NetworkDiagnostics />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
