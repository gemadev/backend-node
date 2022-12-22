import FileSystemContainer from './FileSystemContainer.js'

const collection = 'users'

export default class Users extends FileSystemContainer {
  constructor() {
    super(collection)
  }
}