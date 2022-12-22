import mongoose from 'mongoose'
import MongoDBContainer from './MongoDBContainer.js'

const collection = 'chats'
const chatsSchema = new mongoose.Schema({
  author: {
      email: String,
      first_name: String,
      last_name: String,
      age: Number,
      alias: String,
      avatar: String
  },
  message: String,
  date: String,
  time: String
}, {versionKey: false})


export default class Chats extends MongoDBContainer {
  constructor() {
    super(collection, chatsSchema) // la funcion super() transmite las variables que le pase al padre para que haga lo suyo y por herencia me transmita los metodos en funcion de ellas.
  }
}
