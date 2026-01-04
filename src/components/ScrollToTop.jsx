import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that scrolls window to top on every route change
 * Fixes the issue where pages open in the middle instead of at the top
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Small delay to ensure content has rendered before scrolling
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, search]);

  return null;
}

