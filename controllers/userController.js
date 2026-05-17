const pool = require('../db')

// ACTUALIZAR PERFIL

exports.actualizarPerfil = async (req, res) => {

  try {

    const userId = req.user.id

    const {

      nombre,
      apellido,
      celular,
      pais,
      ciudad,
      idioma_nativo,
      objetivo,
      biografia

    } = req.body

    let foto_perfil = null

    // SI SUBE FOTO

    if(req.file){

      foto_perfil = req.file.filename

    }

    await pool.promise().query(

      `
      UPDATE users
      SET

      nombre = ?,
      apellido = ?,
      celular = ?,
      pais = ?,
      ciudad = ?,
      idioma_nativo = ?,
      objetivo = ?,
      biografia = ?,

      foto_perfil = COALESCE(?, foto_perfil)

      WHERE id = ?
      `,

      [

        nombre,
        apellido,
        celular,
        pais,
        ciudad,
        idioma_nativo,
        objetivo,
        biografia,

        foto_perfil,

        userId

      ]

    )

    res.json({

      mensaje: 'Perfil actualizado correctamente'

    })

  } catch(error){

    console.log(error)

    res.status(500).json({

      mensaje:'Error servidor'

    })

  }

}