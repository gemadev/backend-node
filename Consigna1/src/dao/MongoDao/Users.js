import mongoose from 'mongoose'
import MongoDBContainer from './MongoDBContainer.js'

const collection = 'users'
const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  admin: Boolean
}, {versionKey: false})


export default class Users extends MongoDBContainer {
  constructor() {
    super(collection, usersSchema) // la funcion super() transmite las variables que le pase al padre para que haga lo suyo y por herencia me transmita los metodos en funcion de ellas.
  }
}
