const persistance = 'MONGOATLAS'

let productsService
let cartsService
let usersService
let chatsService

switch(persistance) { // Usamos dinamic imports
  case "MEMORY":
    const {default: MemProd} = await import('./MemoryDao/Products.js')
    productsService = new MemProd()
    const {default: MemCart} = await import('./MemoryDao/Carts.js')
    cartsService = new MemCart()
    const {default: MemUser} = await import('./MemoryDao/Users.js')
    usersService = new MemUser()
    const {default: MemChat} = await import('./MemoryDao/Chats.js')
    chatsService = new MemChat()
    break
  case "FS":
    const {default: FSProd} = await import('./FileSystemDao/Products.js')
    productsService = new FSProd()
    const {default: FSCart} = await import('./FileSystemDao/Carts.js')
    cartsService = new FSCart()
    const {default: FSUser} = await import('./FileSystemDao/Users.js')
    usersService = new FSUser()
    const {default: FSChat} = await import('./FileSystemDao/Chats.js')
    chatsService = new FSChat()
    break
  case "MONGOATLAS":
    const {default: MonProd} = await import('./MongoDao/Products.js')
    productsService = new MonProd()
    const {default: MonCart} = await import('./MongoDao/Carts.js')
    cartsService = new MonCart()
    const {default: MonUser} = await import('./MongoDao/Users.js')
    usersService = new MonUser()
    const {default: MonChat} = await import('./MongoDao/Chats.js')
    chatsService = new MonChat()
    break
}

const services = {
  productsService,
  cartsService,
  usersService,
  chatsService
}

export default services