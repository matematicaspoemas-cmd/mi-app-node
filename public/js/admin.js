const token =
localStorage.getItem('token')

if(!token){

  window.location.href =
  '/login.html'

}

/* ===== LOGOUT ===== */

function logout(){

  localStorage.removeItem('token')

  window.location.href =
  '/login.html'

}

/* ===== CARGAR ADMIN ===== */

async function cargarAdmin(){

  try{

    const res = await fetch(

      '/api/users/perfil',

      {

        headers:{
          Authorization:
          'Bearer ' + token
        }

      }

    )

    const data = await res.json()

    if(!res.ok){

      throw new Error(data.mensaje)

    }

    const user = data.user

    /* ===== VALIDAR ADMIN ===== */

    if(user.rol !== 'admin'){

      alert('Acceso denegado')

      window.location.href =
      '/dashboard.html'

      return

    }

    document
    .getElementById('adminName')
    .innerText = user.nombre

    if(user.foto_perfil){

      document
      .getElementById('adminPhoto')
      .src =
      '/uploads/images/' +
      user.foto_perfil

    }

  }catch(error){

    console.log(error)

    window.location.href =
    '/login.html'

  }

}

cargarAdmin()