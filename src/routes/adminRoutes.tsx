
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { RouteErrorBoundary } from "@/components/routing/RouteErrorBoundary";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RouteSkeleton } from "@/components/ui/route-skeleton";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const SystemHealth = lazy(() => import("@/pages/SystemHealth"));

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <RouteErrorBoundary routeId="admin">
          <AdminDashboard />
        </RouteErrorBoundary>
      </ProtectedRoute>
    ),
  },
  {
    path: "/system-health",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <RouteErrorBoundary routeId="system-health">
          <SystemHealth />
        </RouteErrorBoundary>
      </ProtectedRoute>
    ),
  },
];
