const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let posts = []

// Página principal
app.get('/', (req, res) => {
  res.send(`
    <h1>📸 Mini Instagram</h1>

    <form method="POST" action="/post">
      <input name="texto" placeholder="Escribe algo..." required />
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

// crear post
app.post('/post', (req, res) => {
  const texto = req.body.texto

  if (texto) {
    posts.push({ texto })
  }

  res.redirect('/')
})

// ver posts
app.get('/posts', (req, res) => {
  res.json(posts)
})

// iniciar servidor
app.listen(PORT, () => {
  console.log('Mini Instagram corriendo en puerto ' + PORT)
})
