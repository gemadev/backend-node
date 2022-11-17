import { Router } from 'express'
import usersService from '../models/Users.js'
// import { createHash } from '../utils.js'  // Usaremos el create hash una vez que el profe explique como deshashear

const router = Router()

router.post('/register', async(req, res) => {
  const {name, email, password} = req.body
  if (!name || !email || !password) return res.status(400).send({status: 'error', message: 'Incomplete form fields'})
  // El usuario ya esta en la base de datos?
  const exists = await usersService.findOne({email: email}) // Este es el campo unico que estoy solicitando.
  if (exists) return res.status(400).send({status: 'error', message: 'User already exists'})
  // Una vez comprobado que el usuario no existe en nuestra base de datos lo insertamos
  const newUser = {
    name,
    email,
    password: password //createHash(password)
  }
  let result = await usersService.create(newUser)
  res.send({status: 'success', message: 'User succesfuly created. Please proceed to login.', result: result})
})

router.post('/login', async(req, res) => {
  const {email, password} = req.body
  if (!email || !password) return res.status(400).send({status: 'error', message: 'email and password are required'})
  // Verifico si el usuario existe en base de datos con esa contraseña y ese email
  const user = await usersService.findOne({email: email})
  if (!user) return res.status(400).send({status: 'error', message: `User identified as ${email} does not exist`})
  if (user.password != password) return res.status(400).send({status: 'error', message: 'Incorrect password'})
  req.session.user = { // Creo dentro de la session cookie un usuario a mi gusto (Que no transporte info muy importante)
    email,
    role: 'user'
  }
  res.send({status: 'success', message: `Welcome ${email}, you are now logged in.`})
})

router.get('/current', (req, res) => {
  if (!req.session.user) { // Si ya tiene un user es porque ya paso por el login
    return res.status(400).send({status: 'error', message: 'No current active sessions, please log in'})
  }
  res.send({status: 'success', message: `Welcome user ${req.session.user.email}, you still have an ongoing session`})
})

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) return res.status(500).send({status: 'error', message: 'Could not logout, please try again'})
  })
  res.send({status: 'success', message: 'Logged out!'})
})

export default router