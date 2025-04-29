
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

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

// Configure query client with better defaults for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 10 * 1000, // 10 seconds
      refetchOnWindowFocus: import.meta.env.PROD ? 'always' : false,
      refetchOnReconnect: true,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Helmet>
        <title>DentalDeals - Exclusive Deals for Dental Professionals</title>
        <meta name="description" content="Find the best deals on dental supplies and equipment for your practice." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute allowedRoles={["customer", "admin"]}>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/vendor" element={
                    <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                      <VendorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/referrals" element={
                    <ProtectedRoute>
                      <ReferralLeaderboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/system-health" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <SystemHealth />
                    </ProtectedRoute>
                  } />
                  
                  {/* Existing extra pages */}
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/privacy" element={<Privacy />} />
                  
                  {/* New company pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/press" element={<Press />} />
                  
                  {/* New resource pages */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/webinars" element={<Webinars />} />
                  
                  {/* New legal pages */}
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Contact */}
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
