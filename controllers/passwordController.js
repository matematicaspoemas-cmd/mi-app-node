const crypto = require('crypto')

const bcrypt = require('bcrypt')

const pool = require('../db')

const transporter = require('../config/mailer')

/* ===== ENVIAR EMAIL ===== */

exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body

    const [rows] = await pool.promise().query(

      'SELECT * FROM users WHERE email = ?',

      [email]

    )

    if(rows.length === 0){

      return res.status(404).json({

        mensaje:'Usuario no encontrado'

      })

    }

    const token = crypto
      .randomBytes(32)
      .toString('hex')

    const expires = new Date(

      Date.now() + 1000 * 60 * 30

    )

    await pool.promise().query(

      `
      INSERT INTO password_resets
      (email, token, expires_at)
      VALUES (?, ?, ?)
      `,

      [email, token, expires]

    )

    const resetLink =

      `https://appdaxs.aneslice.com/reset-password.html?token=${token}`

    await transporter.sendMail({

      from: process.env.MAIL_USER,

      to: email,

      subject: 'Recuperar contraseña',

      html: `

      <h2>DAXS ENGLISH IA</h2>

      <p>Haz click aquí:</p>

      <a href="${resetLink}">
        Recuperar contraseña
      </a>

      `

    })

    res.json({

      mensaje:'Correo enviado'

    })

  } catch(error){

    console.log(error)

    res.status(500).json({

      mensaje:'Error servidor'

    })

  }

}

/* ===== RESET PASSWORD ===== */

exports.resetPassword = async (req, res) => {

  try {

    const {

      token,
      password

    } = req.body

    const [rows] = await pool.promise().query(

      `
      SELECT * FROM password_resets
      WHERE token = ?
      `,

      [token]

    )

    if(rows.length === 0){

      return res.status(400).json({

        mensaje:'Token inválido'

      })

    }

    const reset = rows[0]

    if(new Date() > new Date(reset.expires_at)){

      return res.status(400).json({

        mensaje:'Token expirado'

      })

    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    await pool.promise().query(

      `
      UPDATE users
      SET password = ?
      WHERE email = ?
      `,

      [

        hashedPassword,
        reset.email

      ]

    )

    await pool.promise().query(

      `
      DELETE FROM password_resets
      WHERE email = ?
      `,

      [reset.email]

    )

    res.json({

      mensaje:'Contraseña actualizada'

    })

  } catch(error){

    console.log(error)

    res.status(500).json({

      mensaje:'Error servidor'

    })

  }

}