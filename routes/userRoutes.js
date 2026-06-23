const express = require('express')

const router = express.Router()

const {
  verificarToken
} = require('../middlewares/authMiddleware')

const upload =
require('../middlewares/uploadMiddleware')

const {

  obtenerPerfil,
  actualizarPerfil

} = require('../controllers/userController')

// ===== OBTENER PERFIL =====

router.get(

  '/perfil',

  verificarToken,

  obtenerPerfil

)

// ===== ACTUALIZAR PERFIL =====

router.put(

  '/perfil',

  verificarToken,

  upload.single('foto'),

  actualizarPerfil

)

module.exports = router