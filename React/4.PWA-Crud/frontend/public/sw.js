// sw.js - Place this file in your public folder
const CACHE_NAME = 'pwa-cache-v1';

// Install event
self.addEventListener('install', function(event) {
  console.log('Service Worker installing...');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Cache opened');
      // Add essential files to cache
      return cache.addAll([
        '/',
        '/static/css/main.css',
        '/static/js/main.js',
        '/icon-192x192.png',
        '/icon-512x512.png'
      ]).catch(function(error) {
        console.log('Cache addAll failed:', error);
      });
    })
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Take control of all clients
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Push event - Handle incoming push notifications
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  let notificationData = {
    title: 'New Notification',
    body: 'You have a new message',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png'
  };

  // Parse the push data if available
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('Push data received:', data);
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        data: data.data || {},
        ...data // Spread any additional properties
      };
    } catch (error) {
      console.error('Error parsing push data:', error);
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: notificationData.data,
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ],
    requireInteraction: false,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
      .then(() => {
        console.log('Notification shown successfully');
      })
      .catch(error => {
        console.error('Error showing notification:', error);
      })
  );
});

// Notification click event
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  const action = event.action;
  const notificationData = event.notification.data || {};
  
  if (action === 'close') {
    // Just close the notification
    return;
  }
  
  // Default action or 'open' action
  const urlToOpen = notificationData.url || '/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      // Check if there's already a window/tab open with the target URL
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no existing window/tab, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    }).catch(function(error) {
      console.error('Error handling notification click:', error);
    })
  );
});

// Fetch event for offline support
self.addEventListener('fetch', function(event) {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Return cached version or fetch from network
      return response || fetch(event.request).catch(function() {
        // If both cache and network fail, return a fallback
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});

// Background sync (optional)
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background sync operations
      console.log('Background sync triggered')
    );
  }
});

// Message event for communication with main thread
self.addEventListener('message', function(event) {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});