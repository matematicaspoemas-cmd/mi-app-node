const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const helmet = require('helmet')

dotenv.config({
  path: path.resolve(__dirname, '.env')
})

const db = require('./db')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const passwordRoutes =
require('./routes/passwordRoutes')
const {
  verificarToken
} = require('./middlewares/authMiddleware')

const app = express()

const PORT = process.env.PORT || 3000

/* ===== MIDDLEWARES ===== */

app.use(helmet())

app.use(express.json())

/* ===== FRONTEND ===== */

app.use(
  express.static(
    path.join(__dirname, 'public')
  )
)

/* ===== UPLOADS ===== */

app.use(
  '/uploads',
  express.static(
    path.join(__dirname, 'uploads')
  )
)

/* ===== ROUTES ===== */

app.use('/api/auth', authRoutes)

app.use('/api/users', userRoutes)
app.use('/api/password', passwordRoutes)

/* ===== HOME ===== */

app.get('/', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'index.html'
    )
  )

})

/* ===== API TEST ===== */

app.get('/api', (req, res) => {

  res.json({
    mensaje: 'API funcionando 🚀',
    estado: 'ok'
  })

})

/* ===== PERFIL ===== */

app.get(

  '/perfil',

  verificarToken,

  async (req, res) => {

    try {

      const [rows] =
        await db.promise().query(

          'SELECT * FROM users WHERE id = ?',

          [req.user.id]

        )

      if(rows.length === 0){

        return res.status(404).json({

          mensaje:'Usuario no encontrado'

        })

      }

      res.json({

        user: rows[0]

      })

    } catch(error){

      console.log(error)

      res.status(500).json({

        mensaje:'Error servidor'

      })

    }

  }

)

/* ===== START SERVER ===== */

app.listen(PORT, () => {

  console.log(
    `Servidor funcionando en puerto ${PORT}`
  )

})