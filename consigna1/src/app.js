import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import yargs from './config/yargs.config.js'
import config from './config/config.js'

const app = express()

const connection = mongoose.connect(config.mongo.MONGO_URL, error => {
  if (error) {
    console.log(error)
  } else {
    console.log('Atlas DB connected')
  }
})

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(session({
  store: MongoStore.create({
    mongoUrl: config.mongo.MONGO_URL,
    ttl: 600 // ttl va en segundos
  }),
  secret: "CoderHouse",
  resave: false,
  saveUninitialized: false,
  // Cookie: {
  //   maxAge:
  // }
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine','handlebars');

app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})

// Queda pendiente el hacer llegar al usuario el error handling en register y login. (Tiene mas que ver con como passport entrega los errores)