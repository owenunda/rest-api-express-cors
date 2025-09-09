const express = require('express')

const app = express()

app.disable('x-powered-by')

app.get('/', (req, res)=>{
  res.json({message: 'hola mundo'})
})

app.listen(PORT, ()=>{
  console.log(`server listening on port http://localhost:${PORT} - app.js:12`);
})