const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Mi Primera App</title>
      </head>

      <body style="
        font-family: Arial;
        background: #111;
        color: white;
        text-align: center;
        padding-top: 50px;
      ">

        <h1>🚀 Mi App Node.js</h1>

        <p>Servidor funcionando correctamente</p>

        <button onclick="mostrarMensaje()">
          Haz clic aquí
        </button>

        <script>
          function mostrarMensaje() {
            alert('Hola Alex 🚀')
          }
        </script>

      </body>
    </html>
  `)
})

app.listen(PORT, () => {
  console.log(\`Servidor funcionando en puerto \${PORT}\`)
})
