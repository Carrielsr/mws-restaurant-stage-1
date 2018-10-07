// DO NOT PUT THIS FILE IN THE js folder. IT NEEDS TO STAY HERE!

// Service Worker is registered at the bottom of main.js

var RR_Cache = 'restaurant-review-cache-v1';

var urlCache = [
    '/',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/index.html',
    '/restaurant.html'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(RR_Cache)
        .then(function(cache) {
            console.log('cache');
            return cache.addAll(urlCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchTheRequest = event.request.clone();

        return fetch(fetchTheRequest)
        .then(function(response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToTheCache =
          response.clone();

          caches.open(RR_Cache)
          .then(function(cache) {
              cache.put(event.request, responseToTheCache);
          });
          return response;
        });

    }));
  });







