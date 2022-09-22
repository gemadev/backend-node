import fs from 'fs';
import __dirname from '../utils.js';

export default class ProductManager {
  constructor () {
    this.path = __dirname + '/data/products.json';
  }
  getAll = async() => {
    try {
      if (fs.existsSync(this.path)) {
        let fileData = await fs.promises.readFile(this.path, 'utf-8')
        let objects = JSON.parse(fileData)
        return objects
      } else {
        return []
      }
    } catch(err) {
      console.log('Cannot read file. Error: ', err)
    }
  }
  save = async(object) => { // Saves with automatic id assignment
    try {
      let objects = await this.getAll()
      if (objects.length === 0) {
        object.id = 1
        objects.push(object)
        await fs.promises.writeFile(this.path, JSON.stringify(objects, null, '\t'))
        return object.id
      } else {
        object.id = objects[objects.length - 1].id + 1
        objects.push(object)
        await fs.promises.writeFile(this.path, JSON.stringify(objects, null, '\t'))
        return object.id
      }
    } catch(err) {
      console.log('Cannot write file. Error: ', err)
    }
  }
  getById = async(id) => {
    try {
      let objects = await this.getAll()
      let object = objects.find(obj => obj.id === id) ? objects.find(obj => obj.id === id) : null
      return object
    } catch(err) {
      console.log('Cannot read file. Error: ', err)
    }
  }
  deleteById = async(id) => {
    try {
      let objects = await this.getAll()
      let newObjects = objects.filter(obj => obj.id != id)
      await fs.promises.writeFile(this.path, JSON.stringify(newObjects, null, '\t'))
    } catch(err) {
      console.log('Cannot delete file. Error: ', err)
    }
  }
  deleteAll = async() => {
    try {
      let objects = []
      await fs.promises.writeFile(this.path, JSON.stringify(objects, null, '\t'))
    } catch(err) {
      console.log('Cannot delete all objects in file. Error: ', err)
    }
  }
  update = async(object) => {
    try {
      let objects = await this.getAll()
      let newObjects = objects.map(obj => {
        if (obj.id === object.id) {
          return object
        } else {
          return obj
        }
      })
      await fs.promises.writeFile(this.path, JSON.stringify(newObjects, null, '\t'))
    } catch(err) {
      console.log('Cannot update file. Error: ', err)
    }
  }
}

