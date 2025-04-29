
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouteErrorBoundary } from "./components/routing/RouteErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { CookieSettingsProvider } from "./context/CookieSettingsContext";
import { RouteSkeleton } from "./components/ui/route-skeleton";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const VendorDashboard = lazy(() => import("./pages/VendorDashboard"));
const ReferralLeaderboard = lazy(() => import("./pages/ReferralLeaderboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SystemHealth = lazy(() => import("./pages/SystemHealth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Existing pages
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Brands = lazy(() => import("./pages/Brands"));
const Privacy = lazy(() => import("./pages/Privacy"));

// New pages
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Press = lazy(() => import("./pages/Press"));
const Blog = lazy(() => import("./pages/Blog"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Webinars = lazy(() => import("./pages/Webinars"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));

// Configure query client with optimized settings for different data types
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 10 * 1000, // 10 seconds default
      refetchOnWindowFocus: import.meta.env.PROD ? 'always' : false,
      refetchOnReconnect: true,
    },
  },
});

// Add data-specific query cache configurations
// Static content (like How It Works, Privacy Policy) can have longer stale times
queryClient.setQueryDefaults(['static-content'], {
  staleTime: 24 * 60 * 60 * 1000, // 24 hours for rarely changing content
  gcTime: 30 * 24 * 60 * 60 * 1000, // 30 days
});

// Deals data should be fresher
queryClient.setQueryDefaults(['deals'], {
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// User data should be very fresh
queryClient.setQueryDefaults(['user-data'], {
  staleTime: 30 * 1000, // 30 seconds
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Helmet>
        <title>DentalDeals - Exclusive Deals for Dental Professionals</title>
        <meta name="description" content="Find the best deals on dental supplies and equipment for your practice." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {/* Global error boundary - catches app-level errors only */}
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <CookieSettingsProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={
                    <RouteErrorBoundary routeId="index">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Index />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/auth" element={
                    <RouteErrorBoundary routeId="auth">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Auth />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/auth/callback" element={
                    <RouteErrorBoundary routeId="auth-callback">
                      <Suspense fallback={<RouteSkeleton />}>
                        <AuthCallback />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/reset-password" element={
                    <RouteErrorBoundary routeId="reset-password">
                      <Suspense fallback={<RouteSkeleton />}>
                        <ResetPassword />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />

                  {/* Protected customer routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute allowedRoles={["customer", "admin"]}>
                      <RouteErrorBoundary routeId="dashboard">
                        <Suspense fallback={<RouteSkeleton type="dashboard" />}>
                          <Dashboard />
                        </Suspense>
                      </RouteErrorBoundary>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <RouteErrorBoundary routeId="settings">
                        <Suspense fallback={<RouteSkeleton />}>
                          <Settings />
                        </Suspense>
                      </RouteErrorBoundary>
                    </ProtectedRoute>
                  } />
                  <Route path="/referrals" element={
                    <ProtectedRoute>
                      <RouteErrorBoundary routeId="referrals">
                        <Suspense fallback={<RouteSkeleton />}>
                          <ReferralLeaderboard />
                        </Suspense>
                      </RouteErrorBoundary>
                    </ProtectedRoute>
                  } />

                  {/* Protected vendor routes */}
                  <Route path="/vendor" element={
                    <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                      <RouteErrorBoundary routeId="vendor">
                        <Suspense fallback={<RouteSkeleton type="vendor" />}>
                          <VendorDashboard />
                        </Suspense>
                      </RouteErrorBoundary>
                    </ProtectedRoute>
                  } />

                  {/* Protected admin routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <RouteErrorBoundary routeId="admin">
                        <Suspense fallback={<RouteSkeleton type="admin" />}>
                          <AdminDashboard />
                        </Suspense>
                      </RouteErrorBoundary>
                    </ProtectedRoute>
                  } />
                  <Route path="/system-health" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <RouteErrorBoundary routeId="system-health">
                        <Suspense fallback={<RouteSkeleton type="admin" />}>
                          <SystemHealth />
                        </Suspense>
                      </RouteErrorBoundary>
                    </ProtectedRoute>
                  } />
                  
                  {/* Public info pages */}
                  <Route path="/how-it-works" element={
                    <RouteErrorBoundary routeId="how-it-works">
                      <Suspense fallback={<RouteSkeleton />}>
                        <HowItWorks />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/brands" element={
                    <RouteErrorBoundary routeId="brands">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Brands />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/privacy" element={
                    <RouteErrorBoundary routeId="privacy">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Privacy />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  
                  {/* New company pages */}
                  <Route path="/about" element={
                    <RouteErrorBoundary routeId="about">
                      <Suspense fallback={<RouteSkeleton />}>
                        <About />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/careers" element={
                    <RouteErrorBoundary routeId="careers">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Careers />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/press" element={
                    <RouteErrorBoundary routeId="press">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Press />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  
                  {/* New resource pages */}
                  <Route path="/blog" element={
                    <RouteErrorBoundary routeId="blog">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Blog />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/help" element={
                    <RouteErrorBoundary routeId="help">
                      <Suspense fallback={<RouteSkeleton />}>
                        <HelpCenter />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  <Route path="/webinars" element={
                    <RouteErrorBoundary routeId="webinars">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Webinars />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  
                  {/* New legal pages */}
                  <Route path="/terms" element={
                    <RouteErrorBoundary routeId="terms">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Terms />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  
                  {/* Contact */}
                  <Route path="/contact" element={
                    <RouteErrorBoundary routeId="contact">
                      <Suspense fallback={<RouteSkeleton />}>
                        <Contact />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                  
                  {/* Catch-all not found route */}
                  <Route path="*" element={
                    <RouteErrorBoundary routeId="not-found">
                      <Suspense fallback={<RouteSkeleton />}>
                        <NotFound />
                      </Suspense>
                    </RouteErrorBoundary>
                  } />
                </Routes>
              </BrowserRouter>
            </CookieSettingsProvider>
          </AuthProvider>
        </TooltipProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
