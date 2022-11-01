import FileSystemContainer from './FileSystemContainer.js'

const collection = 'products'

export default class Products extends FileSystemContainer {
  constructor() {
    super(collection)
  }
}