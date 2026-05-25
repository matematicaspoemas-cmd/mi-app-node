require('dotenv').config()

const nodemailer = require('nodemailer')

async function enviarCorreo() {

  try {

    const transporter = nodemailer.createTransport({

      host: 'smtp.hostinger.com',

      port: 465,

      secure: true,

      auth: {

        user: process.env.MAIL_USER,

        pass: process.env.MAIL_PASSWORD

      }

    })

    const info = await transporter.sendMail({

      from: `"DAXS ENGLISH IA" <${process.env.MAIL_USER}>`,

      to: 'matematicapoemas@gmail.com',

      subject: 'Prueba DAXS EMAIL 🚀',

      html: `

        <h1>Correo funcionando ✅</h1>

        <p>
          Tu sistema de recuperación ya puede enviar emails.
        </p>

      `

    })

    console.log('EMAIL ENVIADO ✅')

    console.log(info.messageId)

  } catch(error) {

    console.log('ERROR ❌')

    console.log(error)

  }

}

enviarCorreo()