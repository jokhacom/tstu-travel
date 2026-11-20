/* Offline support: pages, scripts and text are network-first (always fresh when online),
   photos are cache-first once seen. Bump VERSION to drop old caches. */
var VERSION = 'lot-v7';
var SHELL = ['./', 'assets/css/legacy.css', 'assets/js/legacy.js',
  'content/site.js', 'content/tour.js', 'content/photos.js', 'img/film-poster.webp', 'img/film-end.webp'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;
  var isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;
  if (/\/(video|audio)\//.test(url.pathname)) return; // the film streams with range requests: leave it to the browser
  if ((sameOrigin && /\/img\//.test(url.pathname)) || isFont) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res.ok || res.type === 'opaque') { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
        return res;
      });
    }));
    return;
  }
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (hit) { return hit || caches.match('./'); });
  }));
});
