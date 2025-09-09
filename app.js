const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies.js')
const cors = require('cors')

// inicializamos express
const app = express()

// middlewares
// deshabilita la cabecera x-powered-by
app.disable('x-powered-by')
app.use(express.json())

// Configuracion de CORS
// app.use(cors()) // permite cualquier origen
// app.use(cors({ origin: 'http://localhost:3000' })) // permite solo este origen
// app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:5500'] })) // permite estos dos origenes
// app.use(cors({ origin: '*' })) // permite cualquier origen, no recomendado para produccion
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3000',
      'http://127.0.0.1:5500',
      'https://myapp.com'
    ]

    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origin not allowed by CORS'))
  }
}
))

// metodos normales: get/head/post
// metodos complejos: put/patch/delete

// CORS PREFLIGHT
// OPTIONS

// todos los recursos que sean movies se identifican como /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }
  res.json(movies)
})
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    // 422 es un status code que indica que la peticion es correcta pero el servidor no puede procesarla
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // esto no es REST porque estamos guardando el estado de la aplicacion en memoria
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // añadimos la nueva pelicula al array de peliculas, esto se hara luego en una base de datos
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie

  res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT} - app.js:119`)
})
