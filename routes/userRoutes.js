const express = require('express')

const router = express.Router()

const { verificarToken } = require('../middlewares/authMiddleware')

const upload = require('../middlewares/uploadMiddleware')

const {

  actualizarPerfil

} = require('../controllers/userController')

// ACTUALIZAR PERFIL

router.put(

  '/perfil',

  verificarToken,

  upload.single('foto'),

  actualizarPerfil

)

module.exports = router