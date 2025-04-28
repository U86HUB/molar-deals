
// Service Worker for DentalDeals PWA
const CACHE_NAME = 'dental-deals-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/main.css',
  '/assets/fonts/',
  '/assets/images/'
];

// Install the service worker and cache initial assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service worker cache installation failed:', error);
      })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Network first, falling back to cache strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response to store in cache
        const responseToCache = response.clone();
        
        // Only cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        
        return response;
      })
      .catch(() => {
        // If network request fails, try to serve from cache
        return caches.match(event.request);
      })
  );
});

// Handle offline analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

// Function to sync stored analytics data when back online
async function syncAnalytics() {
  try {
    const storedAnalyticsData = await getStoredAnalyticsData();
    if (storedAnalyticsData && storedAnalyticsData.length) {
      // Send stored data to analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: storedAnalyticsData }),
      });
      
      // Clear successfully synced data
      await clearStoredAnalyticsData();
    }
  } catch (error) {
    console.error('Failed to sync analytics:', error);
  }
}

// These would be implemented with IndexedDB in a real app
function getStoredAnalyticsData() {
  return Promise.resolve([]);
}

function clearStoredAnalyticsData() {
  return Promise.resolve();
}
