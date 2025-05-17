
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state with the current value
    setMatches(media.matches);
    
    // Create event listener for changes
    const listener = () => setMatches(media.matches);
    
    // Listen for changes
    media.addEventListener("change", listener);
    
    // Clean up
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
