import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './__dirname.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import { Server } from 'socket.io'
import { normalize, schema } from 'normalizr'
import services from "./dao/index.js"
import compression from 'compression'
import { reqLogger, noRouteLogger } from './middlewares/logger.middleware.js'

const app = express()

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})

// Schema definition for chat normalization:
const author = new schema.Entity('authors', {}, {idAttribute: "email"})
const message = new schema.Entity('messages', {
  author: author
}, {idAttribute: "_id"})
const chat = new schema.Entity('chats', {
  chats: [message]
})

const chatsService = services.chatsService

const io = new Server(server)
// Al conectarse un usuario en la vista current, le manda a hacer fetch de los productos actualizados.
app.set('socketio', io)

io.on('connection', async (socket) => {
  console.log('a user connected')
  socket.emit('fetchProducts')
  socket.emit('log', normalize({ id: 1, chats: await chatsService.getAll() }, chat)) // Reemplazamos con el metodo de mongoose y normalizamos los chats
  socket.broadcast.emit('newUser', socket.id)
  socket.on('message', async (data) => {
    await chatsService.save(data) // Reemplazamos con el metodo de mongoose
    io.emit('log', normalize({ id: 1, chats: await chatsService.getAll() }, chat)) // Reemplazamos con el metodo de mongoose y normalizamos los chats
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(express.static(__dirname + '/public'))
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://coderhouse:35216855@cluster0.rdhrx5i.mongodb.net/ecommerce?authSource=admin&replicaSet=atlas-f50h5x-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    ttl: 600 // ttl va en segundos
  }),
  secret: "C0derHouse",
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

app.use(reqLogger)

app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use(noRouteLogger)



// Queda pendiente el hacer llegar al usuario el error handling en register y login. (Tiene mas que ver con como passport entrega los errores)

// Actualmente todos los usuarios nuevos se crean por defecto como administradores y tienen asi acceso a la vista de /admin. Para setear por default a admin: false ir a passport.config.js