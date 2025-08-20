import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook that scrolls to top when the route changes
 * This ensures users always start at the top of new pages
 */
export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);
}

/**
 * Utility function to programmatically scroll to top
 * Useful for manual scroll-to-top actions
 */
export function scrollToTop(behavior: ScrollBehavior = 'smooth') {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
}