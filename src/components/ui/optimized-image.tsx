
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl, OptimizedImageProps } from "@/services/imageService";
import { Skeleton } from "@/components/ui/skeleton";

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  quality = 80,
  format = 'webp',
  loading = 'lazy',
  onClick,
  ...props
}: OptimizedImageProps & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState("");
  
  useEffect(() => {
    setLoaded(false);
    setError(false);
    const url = getOptimizedImageUrl(src, { width, height, quality, format });
    setOptimizedSrc(url);
  }, [src, width, height, quality, format]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true); // Mark as loaded even on error to remove skeleton
  };
  
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width, height }}>
      {!loaded && !error && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          className={cn(
            "w-full h-full object-cover transition-opacity",
            loaded ? "opacity-100" : "opacity-0",
            onClick && "cursor-pointer"
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
