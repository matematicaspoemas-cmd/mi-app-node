document
  .getElementById('loginBtn')
  .addEventListener('click', login)

async function login() {

  const email =
    document.getElementById('email').value

  const password =
    document.getElementById('password').value

  const error =
    document.getElementById('error')

  error.innerText = ""

  try {

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      error.innerText =
        data.mensaje || "Credenciales incorrectas"
      return
    }

    // 💾 guardar sesión
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // 🔐 OBTENER ROL REAL (tu BD usa "rol")
    const role = data.user.role || data.user.rol

    // 🚀 redirigir por rol
    if (role === "admin") {
      window.location.href = "/admin/dashboard.html"
    }

    else if (role === "student") {
      window.location.href = "/student/dashboard.html"
    }

    else if (role === "teacher") {
      window.location.href = "/teacher/dashboard.html"
    }

    else {
      error.innerText = "Rol no válido"
    }

  } catch (err) {
    console.error(err)
    error.innerText = "Error en servidor"
  }
}