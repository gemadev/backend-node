import passport from 'passport'
import local from 'passport-local'
import usersService from '../models/Users.js'
import { createHash, isValidPassword } from '../utils.js'
import GithubStrategy from 'passport-github2'

// Utilizamos passport para migrar toda la estructura de registro y login a un solo archivo.
const LocalStrategy = local.Strategy

const initializePassport = () => {
  passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: 'email'},
  async(req, email, password, done) => { // Si no especifiqué el usernameField, entonces dejo en lugar de 'email' a 'username'
    try {
      const {name} = req.body
      if (!name || !email || !password) return done(null, false, {message: 'Incomplete form fields'})
      // El usuario ya esta en la base de datos?
      const exists = await usersService.findOne({email: email}) // Este es el campo unico que estoy solicitando.
      if (exists) return done(null, false, {message: 'User already exists'})
      // Una vez comprobado que el usuario no existe en nuestra base de datos lo insertamos
      const newUser = {
        name,
        email,
        password: createHash(password)
      }
      let result = await usersService.create(newUser)
      // Si todo salió bien en la estrategia
      return done(null, result)
    } catch (error) {
      done(error)
    }
  }))

  passport.use('login', new LocalStrategy({usernameField: 'email'}, async(email, password, done) => {
    try {
      if (!email || !password) return done(null, false, {message: 'Incomplete login fields'})
      let user = await usersService.findOne({email: email})
      if (!user) return done(null, false, {message: 'Incorrect credentials'})
      if (!isValidPassword(user, password)) return done(null, false, {message: 'Incorrect password'})
      return done(null, user)
    } catch (error) {
      done(error)
    }
  }))

  passport.use('github', new GithubStrategy({
    clientID: 'Iv1.96eddcf63537d2c0',
    clientSecret: '6b1ac7bbc650b222b6dcc1cf09a1eae8abd6fa5b',
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
  }, async(accessToken, refreshToken, profile, done) => {
    // Extraer datos del profile
    const {name, email} = profile._json
    // Esiste en la base?
    let user = await usersService.findOne({email: email})
    if (!user) { // Debo crearlo
      let newUser = {
        name,
        email,
        password: '' // Significa que no es una autenticacion normal, sino por terceros
      }
      let result = await usersService.create(newUser)
      return done(null, result)
    } else { // Si entro a este else es porque si encontro al usuario
      return done(null, user)
    }
  }))

  passport.serializeUser((user, done) => { // La serializacion es convertirlo a un id para tener una referencia del usuario
    done(null, user._id)
  })

  passport.deserializeUser(async(id, done) => {
    let result = await usersService.findOne({_id: id})
    return done(null, result)
  })
}

export default initializePassport