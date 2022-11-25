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


const app = express()
const connection = mongoose.connect('mongodb+srv://coderhouse:35216855@cluster0.rdhrx5i.mongodb.net/usersDesafioClase26?authSource=admin&replicaSet=atlas-f50h5x-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', error => {
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
    mongoUrl: 'mongodb+srv://coderhouse:35216855@cluster0.rdhrx5i.mongodb.net/usersDesafioClase26?authSource=admin&replicaSet=atlas-f50h5x-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    ttl: 600 // ttl va en segundos
  }),
  secret: "C0derSessi0n3000",
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

const server = app.listen(8081, () => {
  console.log('CONNECTEDDDDDD')
})

// Queda pendiente el hacer llegar al usuario el error handling en register y login. (Tiene mas que ver con como passport entrega los errores)