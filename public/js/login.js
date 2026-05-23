
async function login() {

  const email =
    document.getElementById('email').value

  const password =
    document.getElementById('password').value

  const error =
    document.getElementById('error')

  error.innerText = ""

  try {

    const res = await fetch(
      '/api/auth/login',
      {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email,
          password
        })

      }
    )

    const data = await res.json()

    if (!res.ok) {

      error.innerText =
        data.mensaje ||
        "Credenciales incorrectas"

      return
    }

    // guardar sesión
    localStorage.setItem(
      'token',
      data.token
    )

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    )

    // redirigir
    window.location.href =
      "/dashboard.html"

  } catch (err) {

    error.innerText =
      "Error en servidor"

  }

}

/* ===== EVENTO BOTON ===== */

document
  .getElementById('loginBtn')
  .addEventListener('click', login)