const sendBtn =
document.getElementById('sendBtn')

sendBtn.addEventListener(

'click',

async () => {

  const email =
  document.getElementById('email').value

  const res = await fetch(

    '/api/password/forgot-password',

    {

      method:'POST',

      headers:{
        'Content-Type':'application/json'
      },

      body:JSON.stringify({

        email

      })

    }

  )

  const data = await res.json()

  document
  .getElementById('msg')
  .innerText =
  data.mensaje

})