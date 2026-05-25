cconst CACHE_NAME = 'daxs-cache-v2'

const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/register.html',

  // admin / student (IMPORTANTE)
  '/admin/dashboard.html',
  '/student/dashboard.html',

  '/css/style.css',
  '/css/login.css',
  '/css/register.css',

  '/js/app.js',
  '/js/login.js',
  '/js/register.js',

  '/manifest.json'
]

/* ===== INSTALL ===== */
self.addEventListener('install', (event) => {
  console.log('✅ SW instalado')

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

/* ===== FETCH (MEJORADO) ===== */
self.addEventListener('fetch', (event) => {

  const url = new URL(event.request.url)

  // 🚫 NO cachear APIs
  if (url.pathname.startsWith('/api')) {
    return
  }

  // 🚫 NO cachear externos
  if (url.origin !== self.location.origin) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )

})

/* ===== ACTIVATE ===== */
self.addEventListener('activate', (event) => {
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
})