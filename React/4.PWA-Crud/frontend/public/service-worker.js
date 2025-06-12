const CACHE_NAME = "employee-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png"
];

// Install: Pre-cache static assets
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Clear old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch: Serve from cache first for dynamic data
self.addEventListener("fetch", (event) => {
  const requestURL = new URL(event.request.url);

  if (requestURL.pathname.includes("/employees") || requestURL.pathname.includes("/uploads/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            if (event.request.method === "GET" && response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(async () => {
            const cachedResponse = await cache.match(event.request);
            return cachedResponse || Response.error();
          });
      })
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .catch(async () => {
          const cachedResponse = await caches.match(event.request);
          return cachedResponse || Response.error();
        })
    );
  }
});
