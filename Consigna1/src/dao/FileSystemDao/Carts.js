import FileSystemContainer from './FileSystemContainer.js'

const collection = 'carts'

export default class Carts extends FileSystemContainer {
  constructor() {
    super(collection)
  }
}