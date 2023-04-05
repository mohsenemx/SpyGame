const whosthespy = "whos-the-spy-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/main.css",
  "/css/fonts.css",
  "/css/menu.css",
  "/js/app.js",
  "/js/quantity.js",
  "/fonts/Poppins-Bold.ttf",
  "/fonts/Poppins-Regular.ttf",
  "/js/serviceWorker.js",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(whosthespy).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
