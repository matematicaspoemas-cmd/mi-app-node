require('dotenv').config()

const express = require('express')
const db = require('./db')

const app = express()

const PORT = process.env.PORT || 3000

// =========================
// MIDDLEWARES
// =========================

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// =========================
// ARCHIVOS PUBLICOS
// =========================

app.use(express.static('public'))

// =========================
// PAGINA PRINCIPAL
// =========================

app.get('/', (req, res) => {

res.send(`

```
<html>

  <head>

    <title>DAXS ENGLISH IA</title>

    <style>

      body{
        font-family: Arial;
        background:#111;
        color:white;
        text-align:center;
        padding-top:50px;
      }

      h1{
        color:#00ff88;
      }

      .card{
        background:#222;
        padding:30px;
        border-radius:15px;
        width:80%;
        max-width:600px;
        margin:auto;
        box-shadow:0 0 20px rgba(0,0,0,0.5);
      }

      button{
        background:#00ff88;
        border:none;
        padding:15px 25px;
        border-radius:10px;
        cursor:pointer;
        font-size:18px;
        margin-top:20px;
      }

      button:hover{
        opacity:0.8;
      }

      a{
        text-decoration:none;
      }

    </style>

  </head>

  <body>

    <div class="card">

      <h1>🚀 DAXS ENGLISH IA</h1>

      <p>
        Plataforma funcionando correctamente
      </p>

      <p>
        ✅ Express funcionando
      </p>

      <p>
        ✅ MySQL conectado
      </p>

      <a href="/speaking-test.html">

        <button>
          🎤 Ir al Examen
        </button>

      </a>

    </div>

  </body>

</html>
```

`)

})

// =========================
// API TEST
// =========================

app.get('/api', (req, res) => {

res.json({

```
mensaje:'🚀 API funcionando correctamente',

estado:'ok'
```

})

})

// =========================
// RESPUESTA EPAYCO
// =========================

app.get('/payment-response', (req, res) => {

res.send(`

```
<html>

  <head>

    <title>Pago recibido</title>

    <style>

      body{
        font-family:Arial;
        background:#111;
        color:white;
        text-align:center;
        padding-top:100px;
      }

      .card{
        background:#222;
        width:80%;
        max-width:600px;
        margin:auto;
        padding:40px;
        border-radius:20px;
      }

      h1{
        color:#00ff88;
      }

    </style>

  </head>

  <body>

    <div class="card">

      <h1>✅ Pago recibido</h1>

      <p>
        Estamos verificando tu transacción con ePayco.
      </p>

      <p>
        En unos segundos tu nivel será desbloqueado.
      </p>

    </div>

  </body>

</html>
```

`)

})

// =========================
// CONFIRMACION EPAYCO
// =========================

app.post('/payment-confirm', (req, res) => {

console.log('🔥 Confirmación ePayco')

console.log(req.body)

// =========================
// EJEMPLO VALIDACION
// =========================

const data = req.body

if(data.x_cod_response == 1){

```
console.log('✅ PAGO APROBADO')
```

}else{

```
console.log('❌ PAGO NO APROBADO')
```

}

res.send('ok')

})

// =========================
// INICIAR SERVIDOR
// =========================

app.listen(PORT, () => {

console.log(`Servidor funcionando en puerto ${PORT}`)

})
