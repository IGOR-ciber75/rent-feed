const CACHE_NAME = "ship-inclino-v1";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./sw.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((resp) => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(()=>{});
      return resp;
    }).catch(()=>cached))
  );
});
