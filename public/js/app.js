let deferredPrompt

const installBtn =
  document.getElementById('installBtn')

/* ===== SERVICE WORKER ===== */

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('/sw.js')

    .then(() => {

      console.log('✅ SW registrado')

    })

    .catch(err => {

      console.log('❌ Error SW:', err)

    })

}

/* ===== APP INSTALABLE ===== */

window.addEventListener(

  'beforeinstallprompt',

  (e) => {

    e.preventDefault()

    deferredPrompt = e

    console.log('🔥 APP INSTALABLE')

    if (installBtn) {

      installBtn.style.display = 'block'

    }

  }

)

/* ===== INSTALAR APP ===== */

if (installBtn) {

  installBtn.addEventListener(

    'click',

    async () => {

      if (!deferredPrompt) return

      deferredPrompt.prompt()

      const result =
        await deferredPrompt.userChoice

      console.log(result)

      deferredPrompt = null

      installBtn.style.display = 'none'

    }

  )

}