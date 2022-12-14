import express from 'express'

const app = express()
const PORT = process.env.PORT || 8081

app.get('/', (req, res) => {
  res.send(`Petición tomada por ${process.pid} en el puerto ${PORT}`)
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))