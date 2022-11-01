import mongoose from 'mongoose'

export default class MongoDBContainer {
  constructor(collection, schema) {
    mongoose.connect('mongodb+srv://coderuser:34838536@cluster0.t6ufdcy.mongodb.net/ecommerce?retryWrites=true&w=majority', error => { // cluster0 es el nombre de mi cluster de bases, ecommerce es el nombre de la base que quiero conectar. Atlas la crea por mi si no existe (no al conectar con ella, recién lo hará al hacer una operación en la colección).
      if (error) {
        console.log(error)
      } else {
        console.log('Atlas DB connected')
      }
    })
    this.model = mongoose.model(collection, schema)
  }
  getAll = async() => {
    try {
      let results = await this.model.find()
      return results
    } catch (error) {
      console.log('Cannot read document. Error: ', error)
    }
  }
  save = async(document) => { // Saves with automatic id assignment handled by mongo
    try {
      let result = await this.model.create(document)
      return result._id
    } catch (error) {
      console.log('Cannot insert document. Error: ', error)
    }
  }
  getById = async(id) => {
    try {
      let result = await this.model.find({_id: id}).lean()
      return result[0]
    } catch (error) {
      console.log('Cannot read document. Error: ', error)
    }
  }
  deleteById = async(id) => {
    try {
      await this.model.deleteOne({'_id': id})
      return true
    } catch(error) {
      console.log('Cannot delete document. Error: ', error)
    }
  }
  deleteAll = async() => {
    try {
      await this.model.deleteMany()
    } catch(error) {
      console.log('Cannot delete all documents in file. Error: ', error)
    }
  }
  updateById = async(id, newDocument) => {
    try {
      let result = await this.model.replaceOne({'_id': id}, newDocument)
      return id
    } catch(error) {
      console.log('Cannot update document. Error: ', error)
    }
  }
}