import express from 'express'
import infoRouter from './routes/info.router.js'
import apiRouter from './routes/api.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/info', infoRouter)
// app.use('/api', apiRouter)

const server = app.listen(8080, () => {
  console.log(`Listening on port: 8080`)
})

