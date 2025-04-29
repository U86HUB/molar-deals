
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { RouteSkeleton } from "@/components/ui/route-skeleton";
import { RouteErrorBoundary } from "@/components/routing/RouteErrorBoundary";

// Lazy load public pages
const Index = lazy(() => import("@/pages/Index"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Brands = lazy(() => import("@/pages/Brands"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const About = lazy(() => import("@/pages/About"));
const Careers = lazy(() => import("@/pages/Careers"));
const Press = lazy(() => import("@/pages/Press"));
const Blog = lazy(() => import("@/pages/Blog"));
const HelpCenter = lazy(() => import("@/pages/HelpCenter"));
const Webinars = lazy(() => import("@/pages/Webinars"));
const Terms = lazy(() => import("@/pages/Terms"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Auth = lazy(() => import("@/pages/Auth"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

export const publicRoutes: RouteObject[] = [
  // Index page
  {
    path: "/",
    element: (
      <RouteErrorBoundary routeId="index">
        <Index />
      </RouteErrorBoundary>
    ),
  },
  
  // Authentication routes
  {
    path: "/auth",
    element: (
      <RouteErrorBoundary routeId="auth">
        <Auth />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/auth/callback",
    element: (
      <RouteErrorBoundary routeId="auth-callback">
        <AuthCallback />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <RouteErrorBoundary routeId="reset-password">
        <ResetPassword />
      </RouteErrorBoundary>
    ),
  },
  
  // Public information pages
  {
    path: "/how-it-works",
    element: (
      <RouteErrorBoundary routeId="how-it-works">
        <HowItWorks />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/brands",
    element: (
      <RouteErrorBoundary routeId="brands">
        <Brands />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/privacy",
    element: (
      <RouteErrorBoundary routeId="privacy">
        <Privacy />
      </RouteErrorBoundary>
    ),
  },
  
  // Company pages
  {
    path: "/about",
    element: (
      <RouteErrorBoundary routeId="about">
        <About />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/careers",
    element: (
      <RouteErrorBoundary routeId="careers">
        <Careers />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/press",
    element: (
      <RouteErrorBoundary routeId="press">
        <Press />
      </RouteErrorBoundary>
    ),
  },
  
  // Resource pages
  {
    path: "/blog",
    element: (
      <RouteErrorBoundary routeId="blog">
        <Blog />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/help",
    element: (
      <RouteErrorBoundary routeId="help">
        <HelpCenter />
      </RouteErrorBoundary>
    ),
  },
  {
    path: "/webinars",
    element: (
      <RouteErrorBoundary routeId="webinars">
        <Webinars />
      </RouteErrorBoundary>
    ),
  },
  
  // Legal pages
  {
    path: "/terms",
    element: (
      <RouteErrorBoundary routeId="terms">
        <Terms />
      </RouteErrorBoundary>
    ),
  },
  
  // Contact
  {
    path: "/contact",
    element: (
      <RouteErrorBoundary routeId="contact">
        <Contact />
      </RouteErrorBoundary>
    ),
  },
  
  // Catch-all not found route
  {
    path: "*",
    element: (
      <RouteErrorBoundary routeId="not-found">
        <NotFound />
      </RouteErrorBoundary>
    ),
  },
];
