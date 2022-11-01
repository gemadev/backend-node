const persistance = 'MONGOATLAS'

let productsService
let cartsService

switch(persistance) { // Uso dinamic imports
  case "MEMORY":
    const {default: MemProd} = await import('./MemoryDao/Products.js')
    productsService = new MemProd()
    const {default: MemCart} = await import('./MemoryDao/Carts.js')
    cartsService = new MemCart()
    break
  case "FS":
    const {default: FSProd} = await import('./FileSystemDao/Products.js')
    productsService = new FSProd()
    const {default: FSCart} = await import('./FileSystemDao/Carts.js')
    cartsService = new FSCart()
    break
  case "MONGOATLAS":
    const {default: MonProd} = await import('./MongoDao/Products.js')
    productsService = new MonProd()
    const {default: MonCart} = await import('./MongoDao/Carts.js')
    cartsService = new MonCart()
    break
}

const services = {
  productsService,
  cartsService
}

export default services