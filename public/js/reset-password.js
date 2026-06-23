const params =
new URLSearchParams(

window.location.search

)

const token =
params.get('token')

const resetBtn =
document.getElementById('resetBtn')

resetBtn.addEventListener(

'click',

async () => {

  const password =
  document.getElementById('password').value

  const res = await fetch(

    '/api/password/reset-password',

    {

      method:'POST',

      headers:{
        'Content-Type':'application/json'
      },

      body:JSON.stringify({

        token,
        password

      })

    }

  )

  const data = await res.json()

  document
  .getElementById('msg')
  .innerText =
  data.mensaje

})