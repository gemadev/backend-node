import mongoose from 'mongoose'
import MongoDBContainer from './MongoDBContainer.js'

const collection = 'products'
const productsSchema = mongoose.Schema({
  timestamp: Number,
  name: String,
  description: String,
  code: String,
  thumbnail: String,
  price: Number,
  stock: Number
}, {versionKey: false})

export default class Products extends MongoDBContainer {
  constructor() {
    super(collection, productsSchema) // la funcion super() transmite las variables que le pase al padre para que haga lo suyo y por herencia me transmita los metodos en funcion de ellas.
  }
}