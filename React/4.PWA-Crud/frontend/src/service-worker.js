/* eslint-disable no-restricted-globals */
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
