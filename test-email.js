require('dotenv').config()

console.log('INICIANDO TEST EMAIL 🚀')

const transporter = require('./config/mailer')

async function testEmail() {

  try {

    console.log('CONECTANDO SMTP...')

    await transporter.verify()

    console.log('SMTP FUNCIONANDO ✅')

    const info = await transporter.sendMail({

      from: `"DAXS ENGLISH IA" <${process.env.MAIL_USER}>`,

      to: 'matematicaspoemas@gmail.com',

      subject: 'Prueba SMTP DAXS 🚀',

      html: `

        <h1>Correo funcionando ✅</h1>

        <p>
          El sistema SMTP de DAXS ya funciona correctamente.
        </p>

      `

    })

    console.log('EMAIL ENVIADO ✅')

    console.log(info)

  } catch(error) {

    console.log('ERROR SMTP ❌')

    console.log(error)

  }

}

testEmail()