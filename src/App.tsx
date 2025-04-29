
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { CookieSettingsProvider } from "./context/CookieSettingsContext";
import HmrErrorRecovery from './components/HmrErrorRecovery';
import { isProduction } from './config/environment';
import { appRoutes } from "./routes/appRoutes";

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

// Router component that uses our route configuration
const AppRouter = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

function App() {
  return (
    <>
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
                    <AppRouter />
                  </BrowserRouter>
                </CookieSettingsProvider>
              </AuthProvider>
            </TooltipProvider>
          </ErrorBoundary>
        </HelmetProvider>
      </QueryClientProvider>
      
      {/* Only include HmrErrorRecovery in development mode */}
      {!isProduction && <HmrErrorRecovery />}
    </>
  );
}

export default App;
