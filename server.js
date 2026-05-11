require('dotenv').config()

const express = require('express')
const db = require('./db')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {

res.send(`

<html>

<head>

<title>DAXS ENGLISH IA</title>

</head>

<body style="background:#111;color:white;text-align:center;padding-top:100px;font-family:Arial;">

<h1>🚀 DAXS ENGLISH IA</h1>

<p>Servidor funcionando correctamente</p>

<a href="/speaking-test.html">

<button>

🎤 Ir al Examen

</button>

</a>

</body>

</html>

`)

})

app.get('/api', (req, res) => {

res.json({

mensaje:'API funcionando',

estado:'ok'

})

})

app.listen(PORT, () => {

console.log(`Servidor funcionando en puerto ${PORT}`)

})
