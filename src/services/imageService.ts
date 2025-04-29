
import { trackError } from './errorService';

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

// Function to optimize image URLs
export const getOptimizedImageUrl = (url: string, options: ImageOptimizationOptions = {}): string => {
  if (!url) return '';

  try {
    // If it's already a data URL or a blob URL, return as is
    if (url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }

    // If using Supabase storage
    if (url.includes('supabase.co/storage/v1/object/public')) {
      const params: string[] = [];
      
      if (options.width) params.push(`width=${options.width}`);
      if (options.height) params.push(`height=${options.height}`);
      if (options.quality) params.push(`quality=${options.quality}`);
      if (options.format) params.push(`format=${options.format}`);
      
      if (params.length > 0) {
        return `${url}?${params.join('&')}`;
      }
      
      return url;
    }

    // For other external images, we could use an image optimization service like Cloudinary or Imgix
    // This is a placeholder implementation
    return url;
  } catch (error) {
    if (error instanceof Error) {
      trackError(error, 'imageService.getOptimizedImageUrl');
    }
    return url; // Fallback to original URL
  }
};

// Function to lazy load images
export const lazyLoadImage = (
  src: string, 
  options: ImageOptimizationOptions = {}, 
  callback?: (img: HTMLImageElement) => void
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      if (callback) callback(img);
      resolve(img);
    };
    
    img.onerror = (error) => {
      if (error instanceof Error) {
        trackError(error, 'imageService.lazyLoadImage');
      }
      reject(new Error('Image failed to load'));
    };
    
    img.src = getOptimizedImageUrl(src, options);
  });
};

// React hook for optimized image loading
export const useOptimizedImage = (url: string, options: ImageOptimizationOptions = {}): string => {
  return getOptimizedImageUrl(url, options);
};

// Function to get image dimensions
export const getImageDimensions = (url: string): Promise<{width: number, height: number}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = (error) => {
      if (error instanceof Error) {
        trackError(error, 'imageService.getImageDimensions');
      }
      reject(new Error('Failed to load image for dimensions'));
    };
    img.src = url;
  });
};

// Universal image component props for TypeScript
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}
