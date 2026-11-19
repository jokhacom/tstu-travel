/* Offline support: pages, scripts and text are network-first (always fresh when online),
   photos are cache-first once seen. Bump VERSION to drop old caches. */
var VERSION = 'lot-v1';
var SHELL = ['./', 'assets/css/legacy.css', 'assets/js/legacy.js', 'assets/js/map-data.js',
  'assets/vendor/gsap.min.js', 'assets/vendor/ScrollTrigger.min.js',
  'content/site.js', 'content/tour.js', 'content/photos.js', 'img/temur-1122.webp', 'img/temur-700.webp'];
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
