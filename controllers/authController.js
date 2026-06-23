const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db')

// 🧠 REGISTRO
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Faltan datos' })
    }

    const [user] = await pool.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (user.length > 0) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.promise().query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    )

    res.json({ mensaje: 'Usuario registrado correctamente' })

  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error en servidor' })
  }
}


// 🔐 LOGIN JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Faltan datos' })
    }

    const [rows] = await pool.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' })
    }

    const user = rows[0]

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.json({
      mensaje: 'Login exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error en servidor' })
  }
}