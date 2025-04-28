
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register service worker for PWA capabilities
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Add performance monitoring
if (typeof window !== 'undefined') {
  // Report Web Vitals
  const reportWebVitals = () => {
    if (window.performance) {
      const metrics = window.performance.getEntriesByType('navigation');
      if (metrics && metrics.length) {
        const navigationTiming = metrics[0] as PerformanceNavigationTiming;
        const loadTime = navigationTiming.loadEventEnd - navigationTiming.startTime;
        console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
        
        // In production, send to analytics
        // analyticsService.trackPerformance('pageLoad', loadTime);
      }
    }
  };
  
  window.addEventListener('load', reportWebVitals);
}

createRoot(document.getElementById("root")!).render(<App />);
