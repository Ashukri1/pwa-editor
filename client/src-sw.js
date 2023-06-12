const { warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerroute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "pages",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});
registerRoute(({ request }) => request.mode === "navigate", pageCache);

//TODO: implement assest caching
registerRoute(
  ({ request }) =>["style", "script", "worker", "image"].includes(request.destination),
  new registerRoute({
    cacheName: "assestCache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
