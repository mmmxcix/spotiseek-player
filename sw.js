// Web-App: die Oberfläche selbst offline vorhalten (startet dann auch ohne Netz).
// Nur eigene Dateien – Anfragen an den PC und an Carmen gehen unverändert durch.
const CACHE = 'spotiseek-app-v1'
const START = new URL('./', self.registration.scope).href

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return
  if (req.mode === 'navigate') {
    // Seite: erst frisch (neue Version), sonst die gemerkte
    e.respondWith(
      fetch(req)
        .then((r) => {
          const copy = r.clone()
          caches.open(CACHE).then((c) => c.put(START, copy))
          return r
        })
        .catch(() => caches.match(START)),
    )
    return
  }
  // Dateien mit Prüfsumme im Namen ändern sich nie: aus dem Speicher, sonst laden und merken
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((r) => {
          if (r.ok) {
            const copy = r.clone()
            caches.open(CACHE).then((c) => c.put(req, copy))
          }
          return r
        }),
    ),
  )
})
