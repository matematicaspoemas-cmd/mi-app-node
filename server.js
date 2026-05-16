const path = require('path')
const dotenv = require('dotenv')

// 🔥 CARGA SEGURA DEL .env
dotenv.config({ path: path.resolve(__dirname, '.env') })

console.log("JWT:", process.env.JWT_SECRET)

const express = require('express')
const db = require('./db')

const authRoutes = require('./routes/authRoutes')
const { verificarToken } = require('./middlewares/authMiddleware')

const app = express()
const PORT = process.env.PORT || 3000

// 🔧 MIDDLEWARES
app.use(express.json())
app.use(express.static('public'))

// 🔐 AUTH ROUTES (REGISTER + LOGIN)
app.use('/api/auth', authRoutes)

// 🧪 HOME
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>DAXS ENGLISH IA</title>
      </head>

      <body style="background:#111;color:white;text-align:center;padding-top:100px;font-family:Arial;">

        <h1>🚀 DAXS ENGLISH IA</h1>
        <p>Sistema funcionando correctamente</p>

        <a href="/login.html">
          <button style="padding:10px 20px;cursor:pointer;">
            🔐 Login
          </button>
        </a>

        <a href="/register.html">
          <button style="padding:10px 20px;cursor:pointer;">
            📝 Registro
          </button>
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

// 🔐 RUTA PROTEGIDA (DASHBOARD BACKEND)
app.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido 🔐',
    user: req.user
  })
})

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`)
})