
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { RouteErrorBoundary } from "@/components/routing/RouteErrorBoundary";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RouteSkeleton } from "@/components/ui/route-skeleton";

// Lazy load vendor pages
const VendorDashboard = lazy(() => import("@/pages/VendorDashboard"));

export const vendorRoutes: RouteObject[] = [
  {
    path: "/vendor",
    element: (
      <ProtectedRoute allowedRoles={["vendor", "admin"]}>
        <RouteErrorBoundary routeId="vendor">
          <VendorDashboard />
        </RouteErrorBoundary>
      </ProtectedRoute>
    ),
  },
];
