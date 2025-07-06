// Utility to detect and handle page reloads
export const isPageReload = (): boolean => {
  // Check if this is a page reload using multiple methods
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  // Method 1: Check navigation type
  if (navigation && navigation.type === 'reload') {
    return true;
  }
  
  // Method 2: Check if page was accessed directly
  if (navigation && navigation.type === 'navigate') {
    return false;
  }
  
  // Method 3: Check for reload in performance navigation (older browsers)
  if (performance.navigation && performance.navigation.type === 1) {
    return true;
  }
  
  // Method 4: Check if the page was accessed via a direct URL
  const referrer = document.referrer;
  const currentDomain = window.location.origin;
  
  // If no referrer or referrer is from a different domain, it might be a direct access
  if (!referrer || !referrer.startsWith(currentDomain)) {
    return true;
  }
  
  return false;
};

// Handle reload redirect
export const handleReloadRedirect = (currentPath: string): void => {
  if (isPageReload() && currentPath !== '/') {
    console.log('Page reload detected on path:', currentPath, '- redirecting to home');
    
    // Use replace to avoid adding to browser history
    window.location.replace('/');
  }
};

// Check if we should redirect to home
export const shouldRedirectToHome = (): boolean => {
  return isPageReload() && window.location.pathname !== '/';
}; 