
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { RouteSkeleton } from "@/components/ui/route-skeleton";
import { RouteErrorBoundary } from "@/components/routing/RouteErrorBoundary";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Lazy load protected pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Settings = lazy(() => import("@/pages/Settings"));
const ReferralLeaderboard = lazy(() => import("@/pages/ReferralLeaderboard"));

export const protectedRoutes: RouteObject[] = [
  // Customer routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["customer", "admin"]}>
        <RouteErrorBoundary routeId="dashboard">
          <Dashboard />
        </RouteErrorBoundary>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <RouteErrorBoundary routeId="settings">
          <Settings />
        </RouteErrorBoundary>
      </ProtectedRoute>
    ),
  },
  {
    path: "/referrals",
    element: (
      <ProtectedRoute>
        <RouteErrorBoundary routeId="referrals">
          <ReferralLeaderboard />
        </RouteErrorBoundary>
      </ProtectedRoute>
    ),
  },
];
