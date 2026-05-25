const token = localStorage.getItem('token')

// 🔐 VALIDACIÓN INICIAL
if (!token) {
  window.location.href = '/login.html'
}

/* ===== LOGOUT ===== */
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login.html'
}

/* ===== CARGAR ADMIN ===== */
async function cargarAdmin() {

  try {

    const res = await fetch('/api/users/perfil', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.mensaje || "Error al cargar usuario")
    }

    const user = data.user

    // 🔐 ROL UNIFICADO
    const role = user.rol || user.role

    if (role !== 'admin') {

      alert('Acceso denegado')

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      window.location.href = '/student/dashboard.html'
      return
    }

    // 💾 sincronizar localStorage
    localStorage.setItem('user', JSON.stringify(user))

    // 👤 nombre admin
    const nameEl = document.getElementById('adminName')
    if (nameEl) {
      nameEl.innerText = user.nombre || 'Admin'
    }

    // 🖼 foto admin
    const photoEl = document.getElementById('adminPhoto')
    if (photoEl) {
      photoEl.src = user.foto_perfil
        ? '/uploads/images/' + user.foto_perfil
        : '/assets/default-user.png'
    }

  } catch (error) {

    console.error(error)

    // 🔥 limpieza de seguridad
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    window.location.href = '/login.html'
  }
}

cargarAdmin()