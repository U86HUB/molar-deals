
import React from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useLocation } from "react-router-dom";

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  routeId?: string;
}

export function RouteErrorBoundary({ children, routeId }: RouteErrorBoundaryProps) {
  const location = useLocation();
  
  // Unique key based on location to force remounting when route changes
  const boundaryKey = `${routeId || 'route'}-${location.pathname}`;
  
  // Implementation extends the base ErrorBoundary
  return (
    <ErrorBoundary key={boundaryKey}>
      {children}
    </ErrorBoundary>
  );
}
