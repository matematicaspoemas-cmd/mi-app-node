const pool = require('../db')

// ===== OBTENER PERFIL =====

exports.obtenerPerfil = async (req, res) => {

  try {

    const userId = req.user.id

    const [rows] = await pool.promise().query(

      `
      SELECT
        id,
        nombre,
        apellido,
        email,
        celular,
        pais,
        ciudad,
        idioma_nativo,
        objetivo,
        biografia,
        rol,
        foto_perfil
      FROM users
      WHERE id = ?
      `,

      [userId]

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

// ===== ACTUALIZAR PERFIL =====

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

    // ===== SI SUBE FOTO =====

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

      mensaje:'Perfil actualizado correctamente'

    })

  } catch(error){

    console.log(error)

    res.status(500).json({

      mensaje:'Error servidor'

    })

  }

}