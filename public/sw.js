const CACHE_NAME = 'daxs-cache-v1'

const urlsToCache = [

  '/',

  '/index.html',

  '/login.html',

  '/register.html',

  '/dashboard.html',

  '/perfil.html',

  '/css/style.css',

  '/css/login.css',

  '/css/register.css',

  '/css/dashboard.css',

  '/css/perfil.css',

  '/js/app.js',

  '/js/login.js',

  '/js/register.js',

  '/js/dashboard.js',

  '/js/perfil.js',

  '/manifest.json'

]

/* ===== INSTALL ===== */

self.addEventListener(

  'install',

  (event) => {

    console.log('✅ SW instalado')

    event.waitUntil(

      caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(urlsToCache)

      })

    )

  }

)

/* ===== FETCH ===== */

self.addEventListener(

  'fetch',

  (event) => {

    event.respondWith(

      caches.match(event.request)

      .then(response => {

        return response || fetch(event.request)

      })

    )

  }

)

/* ===== ACTIVATE ===== */

self.addEventListener(

  'activate',

  (event) => {

    console.log('🔥 SW activado')

    event.waitUntil(

      caches.keys().then(keys => {

        return Promise.all(

          keys.map(key => {

            if (key !== CACHE_NAME) {

              return caches.delete(key)

            }

          })

        )

      })

    )

  }

)