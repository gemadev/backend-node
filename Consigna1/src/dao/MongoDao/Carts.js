import mongoose from 'mongoose'
import MongoDBContainer from './MongoDBContainer.js'

const collection = 'carts'
const cartsSchema = mongoose.Schema({
  timestamp: Number,
  products: Array
}, {versionKey: false})

export default class Carts extends MongoDBContainer {
  constructor() {
    super(collection, cartsSchema) // la funcion super() transmite las variables que le pase al padre para que haga lo suyo y por herencia me transmita los metodos en funcion de ellas.
  }
}