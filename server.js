const express = require('express')

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola desde Node.js 🚀')
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`)
})