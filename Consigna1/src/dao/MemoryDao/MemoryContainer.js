export default class MemoryContainer {
  constructor() {
    this.data = []
  }
  getAll = () => {
    return this.data
  }
  save = (element) => {
    if (this.data.length === 0) {
      element.id = 1
    } else {
      element.id = this.data[this.data.length - 1].id + 1
    }
    this.data.push(element)
    return element.id
  }
  getById = (id) => {
    const element = this.data.find(obj => obj.id == id)
    return element
  }
  deleteById = (id) => {
    let newArray = this.data.filter(obj => id != obj.id)
    this.data = newArray
    return true
  }
  deleteAll = () => {
    this.data = []
  }
  updateById = (id, element) => {
    element.id = id
    let newArray = this.data.map(obj => {
      if (obj.id == id) {
        return element
      } else {
        return obj
      }
    })
    this.data = newArray
    return id
  }
  findOne = async(object) => {
    try {
      let result = this.data.find(obj => Object.toJSON(obj) == Object.toJSON(object)) || null
      return result
    } catch (error) {
      console.log('Cannot find object. Error: ', error)
    }
  }
}