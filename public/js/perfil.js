const token = localStorage.getItem('token')

// 🔐 PROTEGER

if(!token){

  window.location.href = '/login.html'

}

// 💾 GUARDAR PERFIL

async function guardarPerfil(){

  try{

    const formData = new FormData()

    formData.append(
      'nombre',
      document.getElementById('nombre').value
    )

    formData.append(
      'apellido',
      document.getElementById('apellido').value
    )

    formData.append(
      'celular',
      document.getElementById('celular').value
    )

    formData.append(
      'pais',
      document.getElementById('pais').value
    )

    formData.append(
      'ciudad',
      document.getElementById('ciudad').value
    )

    formData.append(
      'objetivo',
      document.getElementById('objetivo').value
    )

    // 📸 FOTO

    const foto =
      document.getElementById('foto').files[0]

    if(foto){

      formData.append('foto', foto)

    }

    console.log("🚀 ENVIANDO PERFIL")

    const res = await fetch(

      '/api/users/perfil',

      {

        method:'PUT',

        headers:{
          Authorization:
            'Bearer ' + token
        },

        body: formData

      }

    )

    const data = await res.json()

    console.log(data)

    if(!res.ok){

      alert(data.mensaje || 'Error')

      return

    }

    alert('✅ Perfil actualizado')

  }catch(error){

    console.log(error)

    alert('Error servidor')

  }

}

// ⬅ VOLVER

function volverDashboard(){

  window.location.href =
    '/dashboard.html'

}

/* ===== EVENTOS ===== */

document
  .getElementById('guardarBtn')
  .addEventListener('click', guardarPerfil)

document
  .getElementById('volverBtn')
  .addEventListener('click', volverDashboard)