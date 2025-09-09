const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie } = require('./validators')

// inicializamos express
const app = express()

const PORT = process.env.PORT ?? 3000

// middlewares
// deshabilita la cabecera x-powered-by
app.disable('x-powered-by')
app.use(express.json())

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
    return res.status(400).json({ error: result.error.message })
  }

  const {
    title,
    genre,
    year,
    director,
    duration,
    rate,
    poster
  } = req.body

  // esto no es REST porque estamos guardando el estado de la aplicacion en memoria
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT} - app.js:70`)
})
