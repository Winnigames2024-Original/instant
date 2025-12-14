importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate} = workbox.strategies;
const {CacheFirst} = workbox.strategies;
const {NetworkFirst} = workbox.strategies;
const {ExpirationPlugin} = workbox.expiration;
const {skipWaiting} = workbox.core;

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname === '/',
  new StaleWhileRevalidate()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/index/'),
  new NetworkFirst()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/trending/'),
  new NetworkFirst()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/recent/'),
  new NetworkFirst()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/analytics/'),
  new CacheFirst({
    cacheName: 'analytics-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 1 * 10 * 60,
      }),
    ]
  })
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/instant/'),
  new NetworkFirst()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/search/'),
  new NetworkFirst()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/popular/searches/'),
  new CacheFirst({
    cacheName: 'popular-searches-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60,
        maxEntries: 1,
      }),
    ]
  })
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/recommendations/'),
  new CacheFirst({
    cacheName: 'recommendation-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ]
  })
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.endsWith('.js'),
  new StaleWhileRevalidate()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.endsWith('.css'),
  new StaleWhileRevalidate()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.endsWith('.mp3'),
  new CacheFirst()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.includes('/instants_images/'),
  new CacheFirst()
);

registerRoute(
  ({sameOrigin, url}) => sameOrigin && url.pathname.startsWith('/media/'),
  new CacheFirst()
);

self.skipWaiting();
