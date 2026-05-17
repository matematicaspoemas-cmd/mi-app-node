const token = localStorage.getItem('token')

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
    throw new Error(data.mensaje || 'Error auth')
  }

  return data

})

.then(data => {

  const user = data.user

  document.getElementById('userName').innerText =
    "👤 " + user.nombre

  document.getElementById('email').innerText =
    "Email: " + user.email

  document.getElementById('rol').innerText =
    "Rol: " + user.rol

})

.catch(err => {

  console.log(err)

  localStorage.removeItem('token')
  localStorage.removeItem('user')

  window.location.href = "/login.html"

})

// 🚪 LOGOUT

function logout(){

  localStorage.removeItem('token')
  localStorage.removeItem('user')

  window.location.href = "/login.html"

}

// 👤 PERFIL

function irPerfil(){

  window.location.href = "/perfil.html"

}