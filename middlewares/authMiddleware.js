const jwt = require('jsonwebtoken')

// 🔐 Middleware para verificar token JWT
exports.verificarToken = (req, res, next) => {

  // Buscar token en headers
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'No hay token' })
  }

  // Formato esperado: Bearer TOKEN
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ mensaje: 'Token inválido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // guardar usuario dentro de req
    req.user = decoded

    next()

  } catch (error) {
    return res.status(401).json({ mensaje: 'Token no válido' })
  }
}