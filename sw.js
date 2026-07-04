/* Service worker Swanne. — cache hors-ligne + mises à jour automatiques */
const CACHE = "swanne-v62";
const ASSETS = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== location.origin) return; // on ne gère que nos propres fichiers

  if (req.mode === "navigate") {
    // réseau d'abord (pour récupérer les mises à jour), cache en secours (hors-ligne)
    e.respondWith((async () => {
      try {
        const net = await fetch(req, {cache:"no-cache"});
        if (net && net.ok) { (await caches.open(CACHE)).put("./index.html", net.clone()); }
        return net;
      } catch (err) {
        return (await caches.match("./index.html")) || (await caches.match("./")) || Response.error();
      }
    })());
    return;
  }

  // autres fichiers : cache d'abord, réseau en secours
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const net = await fetch(req, {cache:"no-cache"});
      if (net && net.ok && (net.type === "basic" || net.type === "default")) {
        (await caches.open(CACHE)).put(req, net.clone());
      }
      return net;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});
