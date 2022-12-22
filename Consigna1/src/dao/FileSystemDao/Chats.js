import FileSystemContainer from './FileSystemContainer.js'

const collection = 'chats'

export default class Chats extends FileSystemContainer {
  constructor() {
    super(collection)
  }
}