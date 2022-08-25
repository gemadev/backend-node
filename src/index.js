const Container = require('./containers/container')


const path = 'src/files/products.json'

const productService = new Container(path);

const testEnvironment = async() => {
  // Reading all products:
  console.log('Getting products')
  let products = await productService.getAll()
  console.log(products)

  // Saving new products:

  // Saving Cerveza:
  console.log('Adding product 1')
  let product1 = {
    name: 'Cerveza',
    price: 250,
    thumbnail: 'url-de-la-imágen'
  }
  let id1 = await productService.save(product1)
  console.log('Product saved succesfully with id: ', id1)

  // Saving Gaseosa:
  console.log('Adding product 2')
  let product2 = {
    name: 'Gaseosa',
    price: 200,
    thumbnail: 'url-de-la-imágen'
  }
  let id2 = await productService.save(product2)
  console.log('Product saved succesfully with id: ', id2)

  // Saving Agua:
  console.log('Adding product 3')
  let product3 = {
    name: 'Agua',
    price: 180,
    thumbnail: 'url-de-la-imágen'
  }
  let id3 = await productService.save(product3)
  console.log('Product saved succesfully with id: ', id3)

  // Retrieving a product by id:
  let idToRetrieve = 1
  let retrievedProduct = await productService.getById(idToRetrieve)
  console.log(`Retrieved product with id ${idToRetrieve}: `, retrievedProduct)

  // Deleting a product by id:
  let idToDelete = 2
  await productService.deleteById(idToDelete)
  console.log(`Deleted product with id ${idToDelete}`)

  // Deleting all products in file:
  await productService.deleteAll()
  console.log('Deleted all products')
}

testEnvironment()