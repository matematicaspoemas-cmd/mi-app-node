const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// middleware para recibir JSON
app.use(express.json())

// "base de datos" temporal en memoria
let posts = []

// página principal (frontend simple)
app.get('/', (req, res) => {
  res.send(`
    <h1>📸 Mini Instagram</h1>

    <form method="POST" action="/post">
      <input name="texto" placeholder="Escribe algo..." />
      <button>Publicar</button>
    </form>

    <h2>Posts:</h2>
    <div id="posts"></div>

    <script>
      async function cargarPosts() {
        const res = await fetch('/posts')
        const data = await res.json()

        document.getElementById('posts').innerHTML =
          data.map(p => '<p>📌 ' + p.texto + '</p>').join('')
      }

      cargarPosts()
    </script>
  `)
})
