/* eslint-disable no-restricted-globals */
/* global clients */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim();
self.skipWaiting();
cleanupOutdatedCaches();

// Precache React build files (e.g. index.html, static JS/CSS)
precacheAndRoute(self.__WB_MANIFEST);

// Cache JS, CSS, and HTML using stale-while-revalidate
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
);

// Cache images (uploaded files, app icons, etc.)
registerRoute(
  ({ request }) => request.destination === 'image' || request.url.includes('/uploads/'),
  new CacheFirst({
    cacheName: 'image-assets',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }) // 30 Days
    ]
  })
);

// Cache API calls (file list, exists check, delete)
registerRoute(
  ({ url }) => url.pathname.startsWith('/files') || url.pathname.startsWith('/exists') || url.pathname.startsWith('/delete'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
);

// Optional: Offline fallback for HTML pages
setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/offline.html');
  }
  return Response.error();
});

// ======= PUSH NOTIFICATION HANDLING =======

self.addEventListener('push', function(event) {
  console.log('[SW] Push event received:', event);
  
  let notificationData = {
    title: 'New Notification',
    body: 'You have a new message',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png'
  };

  if (event.data) {
    try {
      const data = event.data.json();
      console.log('[SW] Push data received:', data);
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        data: data.data || {},
        ...data
      };
    } catch (error) {
      console.error('[SW] Error parsing push data:', error);
      if (event.data.text) {
        notificationData.body = event.data.text();
      }
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: notificationData.data,
    tag: 'notification-' + Date.now(),
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
    silent: false,
    timestamp: Date.now()
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
      .then(() => {
        console.log('[SW] Notification shown successfully');
      })
      .catch(error => {
        console.error('[SW] Error showing notification:', error);
      })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notification clicked:', event);
  event.notification.close();

  const action = event.action;
  const notificationData = event.notification.data || {};
  const urlToOpen = notificationData.url || '/';

  if (action === 'close') return;

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      for (let client of clientList) {
        if (client.url.includes(urlToOpen.replace('/', '')) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    }).catch(function(error) {
      console.error('[SW] Error handling notification click:', error);
    })
  );
});

self.addEventListener('notificationclose', function(event) {
  console.log('[SW] Notification was closed:', event.notification.tag);
});

self.addEventListener('sync', function(event) {
  console.log('[SW] Background sync triggered:', event.tag);
  if (event.tag === 'notification-sync') {
    event.waitUntil(handleOfflineNotifications());
  }
});

self.addEventListener('message', function(event) {
  console.log('[SW] Message received:', event.data);

  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data?.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: '1.0.0' });
  }

  if (event.data?.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data.payload;
    self.registration.showNotification(title, options);
  }
});

async function handleOfflineNotifications() {
  try {
    console.log('[SW] Handling offline notifications');
  } catch (error) {
    console.error('[SW] Error handling offline notifications:', error);
  }
}

self.addEventListener('install', function(event) {
  console.log('[SW] Service Worker installing...');
  event.waitUntil(
    caches.open('notification-assets').then(cache => {
      return cache.addAll([
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/icon-72x72.png'
      ]).catch(error => {
        console.log('[SW] Failed to cache notification assets:', error);
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[SW] Service Worker activated');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name.startsWith('old-notification-'))
            .map(name => caches.delete(name))
        );
      })
    ])
  );
});
