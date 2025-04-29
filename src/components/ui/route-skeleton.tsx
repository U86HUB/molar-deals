
import { Skeleton } from "@/components/ui/skeleton";

interface RouteSkeletonProps {
  type?: "dashboard" | "admin" | "vendor" | "default";
}

export function RouteSkeleton({ type = "default" }: RouteSkeletonProps) {
  switch (type) {
    case "dashboard":
      return (
        <div className="animate-fade-in">
          <div className="container mx-auto px-4 pt-24 pb-16">
            <div className="mb-8">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            
            <div className="w-full h-40 mb-8">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
            
            <div className="mb-4">
              <Skeleton className="h-10 w-64 mb-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      );
      
    case "admin":
      return (
        <div className="animate-fade-in">
          <div className="h-16 w-full bg-white shadow mb-6">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="rounded-lg overflow-hidden">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      );
      
    case "vendor":
      return (
        <div className="animate-fade-in">
          <div className="h-16 w-full bg-white shadow mb-6">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-1/3 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-8 w-44 mb-4" />
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      );
      
    default:
      return (
        <div className="animate-fade-in min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-12 w-full max-w-md mx-auto mb-8" />
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-48 w-full mb-6" />
              <div className="space-y-4">
                {Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
              <div className="mt-8 space-y-6">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-10 w-1/3 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
  }
}
