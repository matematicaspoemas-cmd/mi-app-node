async function register() {

  const nombre = document.getElementById('nombre').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const message = document.getElementById('message')

  message.innerText = ""

  try {

    const res = await fetch('/api/auth/register', {

      method:'POST',

      headers:{
        'Content-Type':'application/json'
      },

      body: JSON.stringify({
        nombre,
        email,
        password
      })

    })

    const data = await res.json()

    message.innerText = data.mensaje

    if(res.ok){

      message.style.color = "#22c55e"

      setTimeout(() => {

        window.location.href = "/login.html"

      }, 1500)

    } else {

      message.style.color = "#f87171"

    }

  } catch(err){

    message.innerText = "Error en servidor"
    message.style.color = "#f87171"

  }

}