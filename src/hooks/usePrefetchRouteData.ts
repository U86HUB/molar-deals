
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

/**
 * Hook to prefetch data based on the current route
 * This helps in loading data for pages the user is likely to visit next
 */
export function usePrefetchRouteData() {
  const queryClient = useQueryClient();
  const location = useLocation();
  
  useEffect(() => {
    // Determine which data to prefetch based on current route
    const prefetchRelatedData = () => {
      // If user is on the homepage, prefetch dashboard data
      if (location.pathname === '/') {
        queryClient.prefetchQuery({
          queryKey: ['deals', 'featured'],
          queryFn: () => {
            // This would be an API call in a real app
            return Promise.resolve({ title: 'Featured Deal' });
          }
        });
      }
      
      // If user is on dashboard, prefetch settings data
      if (location.pathname === '/dashboard') {
        queryClient.prefetchQuery({
          queryKey: ['user-data', 'settings'],
          queryFn: () => {
            // This would be an API call in a real app
            return Promise.resolve({ notifications: true });
          }
        });
      }
    };
    
    // Run the prefetch with a slight delay to prioritize current page rendering
    const timer = setTimeout(prefetchRelatedData, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname, queryClient]);
}
