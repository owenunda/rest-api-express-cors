const z = require('zod')

// validacion de datos con zod
const movieSchema = z.object({
  title: z.string({
    required_error: 'movie title is required',
    invalid_type_error: 'movie title must be a string'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'poster must be a valid URL'
  }),
  genre: z.array(z.string().enum(['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Documentary']), {
    required_error: 'genre is required',
    invalid_type_error: 'genre must be an array of strings'
  })
})

function validateMovie (data) {
  // safeParse devuelve un objeto con success y data o error
  return movieSchema.safeParse(data)
}

module.exports = {
  validateMovie
}
