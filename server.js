require('dotenv').config()

const express = require('express')
const db = require('./db')
const authRoutes = require('./routes/authRoutes')
const { verificarToken } = require('./middlewares/authMiddleware')

const app = express()

const PORT = process.env.PORT || 3000

// 🔧 MIDDLEWARES GLOBALES
app.use(express.json())
app.use(express.static('public'))

// 🔐 RUTAS DE AUTENTICACIÓN (login/register)
app.use('/api/auth', authRoutes)

// 🧪 RUTA BASE
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
          <button>🎤 Ir al Examen</button>
        </a>

      </body>
    </html>
  `)
})

// 🧪 API TEST
app.get('/api', (req, res) => {
  res.json({
    mensaje: 'API funcionando',
    estado: 'ok'
  })
})

// 🔐 RUTA PROTEGIDA (PRUEBA JWT)
app.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido 🔐',
    user: req.user
  })
})

// 🚀 INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`)
})