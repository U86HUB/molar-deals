
import { useCallback } from "react";

export const useHashParams = () => {
  const parseHashParams = useCallback(() => {
    try {
      const hash = window.location.hash.substring(1);
      if (!hash) return null;
      
      return hash.split('&').reduce((result: Record<string, string>, item) => {
        const parts = item.split('=');
        if (parts.length === 2) {
          result[parts[0]] = decodeURIComponent(parts[1]);
        }
        return result;
      }, {});
    } catch (e) {
      console.error("Error parsing hash params:", e);
      return null;
    }
  }, []);

  return { parseHashParams };
};
