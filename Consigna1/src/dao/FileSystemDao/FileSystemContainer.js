import fs from 'fs'
import __dirname from '../../__dirname.js'

export default class FileSystemContainer {
  constructor(collection) {
    this.path = __dirname + `/db/${collection}.json`
  }
  getAll = async() => {
    try {
      if (fs.existsSync(this.path)) {
        let fileData = await fs.promises.readFile(this.path, 'utf-8')
        console.log(fileData)
        let elements = JSON.parse(fileData)
        return elements
      } else {
        return []
      }
    } catch(error) {
      console.log('Cannot read file. Error: ', error)
    }
  }
  save = async(element) => { // Saves with automatic id assignment handled mannually
    try {
      let elements = await this.getAll()
      if (elements.length === 0) {
        element.id = 1
        elements.push(element)
        await fs.promises.writeFile(this.path, JSON.stringify(elements, null, '\t'))
        return element.id
      } else {
        element.id = elements[elements.length - 1].id + 1
        elements.push(element)
        await fs.promises.writeFile(this.path, JSON.stringify(elements, null, '\t'))
        return element.id
      }
    } catch(error) {
      console.log('Cannot write file. Error: ', error)
    }
  }
  getById = async(id) => {
    try {
      let elements = await this.getAll()
      let element = elements.find(obj => obj.id == id) ? elements.find(obj => obj.id == id) : null
      return element
    } catch(error) {
      console.log('Cannot read file. Error: ', error)
    }
  }
  deleteById = async(id) => {
    try {
      let elements = await this.getAll()
      let newArray = elements.filter(obj => obj.id != id)
      await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, '\t'))
      return true
    } catch(error) {
      console.log('Cannot delete file. Error: ', error)
    }
  }
  deleteAll = async() => {
    try {
      let elements = []
      await fs.promises.writeFile(this.path, JSON.stringify(elements, null, '\t'))
    } catch(error) {
      console.log('Cannot delete all objects in file. Error: ', error)
    }
  }
  updateById = async(id, element) => {
    element.id = id
    try {
      let elements = await this.getAll()
      let newArray = elements.map(obj => {
        if (obj.id == id) {
          return element
        } else {
          return obj
        }
      })
      await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, '\t'))
      return id
    } catch(error) {
      console.log('Cannot update file. Error: ', error)
    }
  }
  findOne = async(object) => {
    try {
      let elements = await this.getAll()
      let result = elements.find(obj => Object.toJSON(obj) == Object.toJSON(object)) || null
      return result
    } catch (error) {
      console.log('Cannot find object. Error: ', error)
    }
  }
}