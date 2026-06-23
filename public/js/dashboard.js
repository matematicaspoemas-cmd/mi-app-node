const token = localStorage.getItem('token')

console.log("TOKEN:", token)

// 🔐 PROTEGER RUTA

if (!token) {

  window.location.href = "/login.html"

}

// 🧠 CARGAR USUARIO

fetch('/perfil', {

  method: 'GET',

  headers: {

    Authorization: 'Bearer ' + token

  }

})

.then(async res => {

  const data = await res.json()

  if (!res.ok) {

    throw new Error(
      data.mensaje || 'Error auth'
    )

  }

  return data

})

.then(data => {

  const user = data.user

  // 📸 FOTO PERFIL

  if(user.foto_perfil){

    document
      .getElementById('fotoPerfil')
      .src =
      '/uploads/images/' +
      user.foto_perfil

  }

  // 👤 NOMBRE

  document
    .getElementById('userName')
    .innerText =
    "👤 " + user.nombre

  // 📧 EMAIL

  document
    .getElementById('email')
    .innerText =
    "Email: " + user.email

  // 🔐 ROL

  document
    .getElementById('rol')
    .innerText =
    "Rol: " + user.rol

})

.catch(err => {

  console.log("ERROR DASHBOARD:", err)

})
// 🚪 LOGOUT

function logout(){

  localStorage.removeItem('token')

  localStorage.removeItem('user')

  window.location.href =
    "/login.html"

}

// 👤 PERFIL

function irPerfil(){

  window.location.href =
    "/perfil.html"

}

/* ===== BOTONES ===== */

document
  .getElementById('logoutBtn')
  .addEventListener('click', logout)

document
  .getElementById('perfilBtn')
  .addEventListener('click', irPerfil)