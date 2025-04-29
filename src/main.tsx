
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupGlobalErrorTracking } from './services/errorService';
import { isProduction } from './config/environment';

// Set up global error tracking
setupGlobalErrorTracking();

// Add a comment explaining how to run lint checks
// To run lint checks: npm run lint
// This will help catch unused code and imports
// For CI integration, add this to your workflows:
// - run: npm run lint -- --max-warnings=0

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
