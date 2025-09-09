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
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: 'poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Biography']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    })
})

function validateMovie (data) {
  // safeParse devuelve un objeto con success y data o error
  return movieSchema.safeParse(data)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
