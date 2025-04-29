
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupGlobalErrorTracking } from './services/errorService';
import { isProduction } from './config/environment';

// Set up global error tracking
setupGlobalErrorTracking();

// Add production optimizations
if (isProduction) {
  // Disable console.log in production
  console.log = () => {};
  console.debug = () => {};
}

// Render the app with strict mode in development only
const AppWithStrictMode = isProduction ? (
  <App />
) : (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')!).render(AppWithStrictMode);
