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

  </head>

  <body style="background:#111;color:white;text-align:center;padding-top:100px;font-family:Arial;">

    <h1>🚀 DAXS ENGLISH IA</h1>

    <p>Servidor funcionando correctamente</p>

    <a href="/speaking-test.html">

      <button style="padding:15px 30px;font-size:20px;cursor:pointer;">

        🎤 Ir al Examen

      </button>

    </a>

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
mensaje:'API funcionando',

estado:'ok'
```

})

})

// =========================
// RESPUESTA EPAYCO
// =========================

app.get('/payment-response', (req, res) => {

res.send('✅ Pago recibido')

})

// =========================
// CONFIRMACION EPAYCO
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
