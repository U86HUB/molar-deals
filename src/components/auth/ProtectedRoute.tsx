
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the login page with the current location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if the route requires specific roles
  if (allowedRoles && user?.user_metadata?.role) {
    const userRole = user.user_metadata.role;
    if (!allowedRoles.includes(userRole)) {
      // Redirect based on user role if they don't have access
      if (userRole === "vendor") {
        return <Navigate to="/vendor" replace />;
      } else if (userRole === "admin") {
        return <Navigate to="/admin" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  return <>{children}</>;
};
