require('dotenv').config()

const express = require('express')
const db = require('./db')

const app = express()

const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// Archivos públicos
app.use(express.static('public'))

// =========================
// PAGINA PRINCIPAL
// =========================

app.get('/', (req, res) => {

res.send(`

```
<html>

  <head>

    <title>Mi API Node.js</title>

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

    </style>

  </head>

  <body>

    <div class="card">

      <h1>🚀 Mi App Node.js</h1>

      <p>
        Servidor funcionando correctamente
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
// API
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
// PAYMENT RESPONSE
// =========================

app.get('/payment-response', (req, res) => {

res.send('✅ Pago recibido')

})

// =========================
// PAYMENT CONFIRM
// =========================

app.post('/payment-confirm', (req, res) => {

console.log(req.body)

res.send('ok')

})

// =========================
// SERVIDOR
// =========================

app.listen(PORT, () => {

console.log(`Servidor funcionando en puerto ${PORT}`)

})
