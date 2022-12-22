import { Router } from 'express'
import services from "../dao/index.js"

const router = Router()
const cartsService = services.cartsService
const productsService = services.productsService
import { apiErrorLogger } from '../middlewares/logger.middleware.js'

router
  .route('/')
    .post(
      // Para incorporar un nuevo carrito se debe enviar una petición POST al endpoint /api/carts
      // Al guardarse en el servidor se le asigna un id automático, un timestamp, y un array vacío de productos.
      async (req, res) => {
        try {
          const cart = {
            timestamp: Date.now(),
            products: []
          }
          const savedCartId = await cartsService.save(cart)
          const result = await cartsService.getAll()
          if (!savedCartId) return res.status(500).json({ message: 'Error while saving cart' })
          res.send({ message: `Cart saved with id: ${savedCartId}`})
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
router
  .route('/:cid')
    .delete(
      // Vacía un carrito y lo elimina. (ELIMINA EL CARRITO).
      async (req, res) => {
        try {
          const cid = req.params.cid
          if (!cid) return res.status(400).send({ message: 'Cart id is mandatory' })
          const cart = await cartsService.getById(cid)
          if (!cart) return res.status(400).send({ message: `Cart with id: ${cid} does not exist` })
          const deleted = await cartsService.deleteById(cid)
          if (!deleted) return res.status(500).send({ message: `There was an error while deleting the cart with id: ${cid}` })
          res.send({ message: `Cart with id: ${cid} successfully deleted` })
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
router
  .route('/:cid/products')
    .get(
      // Me permite listar todos los productos guardados en el carrito (MUESTRA LOS PRODUCTOS, NO SOLO SUS IDs).
      async (req, res) => {
        try {
          const cid = req.params.cid
          if (!cid) return res.status(400).send({ message: 'Cart id is mandatory' })
          const cart = await cartsService.getById(cid)
          if (!cart) return res.status(400).send({ message: `Cart with id: ${cid} does not exist` })
          const products = cart.products
          if (products.length === 0) return res.send({ message: `Cart with id: ${cid} is empty` })
          for (let i = 0; i < products.length; i++) {
            const productId = products[i].id
            const productQuantity = products[i].quantity
            const product = await productsService.getById(productId)
            product.quantity = productQuantity
            delete product.stock
            products[i] = product
          }
          cart.products = products
          res.send(cart)
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
    .post(
      // Para agregar un producto al carrito se debe enviar una petición POST al endpoint /api/carts/:cid/products con
      // la siguiente estructura en el body:
      // {
      //   "id": [id del producto deseado] (As a String),
      //   "quantity": [cantidad del producto deseado] (As a number)
      // }
      // El id del producto debe coincidir con alguno de la base de datos, de lo contrario arrojara un mensaje explicativo.
      // La cantidad debe ser un número entero mayor a 0 de lo contrario arrojara error, y si la cantidad final
      // que resultaria en el carrito es menor al stock del producto, arroja un mensaje advirtiendo que no hay stock suficiente.
      async (req, res) => {
        try {
          const cid = req.params.cid
          if (!cid) return res.status(400).send({ message: 'Cart id is mandatory' })
          const cart = await cartsService.getById(cid)
          if (!cart) return res.status(400).send({ message: `Cart with id: ${cid} does not exist` })
          if (!req.body.id || !req.body.quantity) return res.status(400).send({ message: 'Product id and quantity to add are mandatory' })
          const pid = req.body.id
          let quantity = req.body.quantity
          if (isNaN(quantity)) return res.status(400).send({ message: 'Quantity param must be a number' })
          if (quantity < 1) return res.status(400).send({ message: 'Quantity param must be a positive integer' })
          quantity = parseInt(quantity)
          const product = await productsService.getById(pid)
          if (!product) return res.status(400).send({ message: `Product with id: ${pid} does not exist` })
          const isProductInCart = cart.products.find(p => (p.id == product.id || p.id == product._id))
          const productIndexInCart = cart.products.findIndex(p => (p.id == product.id || p.id == product._id))
          if (isProductInCart) {
            if (product.stock < cart.products[productIndexInCart].quantity + quantity) {
              return res.status(400).send({ message: 'Not enough stock to keep adding this product in these quantities to cart' })
            }
          } else {
            if (product.stock < quantity) {
              res.status(400).send({ message: 'Not enough stock to add this product in these quantities to cart' })
              return
            }
          }
          if (isProductInCart) {
            cart.products = cart.products.map(p => p.id == pid ? {...p, quantity: p.quantity + quantity} : p)
          } else {
            cart.products.push({
              id: pid,
              quantity: quantity
            })
          }
          const updatedCartId = await cartsService.updateById(cid, cart)
          if (!updatedCartId) return res.status(500).json({ message: 'Error while updating cart' })
          res.send({ message: `Cart with id: ${updatedCartId} succesfuly updated. Product with id: ${pid} succesfuly added` })
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
router
  .route('/:cid/products/:pid')
    .delete(
      // Para eliminar un producto del carrito por su id de carrito y de producto.
      // Si el producto no está en el carrito, se devuelve un error explicando que el carrito no contiene el producto.
      // Si el producto está en el carrito, se elimina del carrito (ELIMINA TODA LA CANTIDAD DE ESE PRODUCTO Y EL PRODUCTO MISMO DEL CARRITO).
      async (req, res) => {
        try {
          const cid = req.params.cid
          if (!cid) return res.status(400).send({ message: 'Cart id is mandatory' })
          const cart = await cartsService.getById(cid)
          if (!cart) return res.status(400).send({ message: `Cart with id: ${cid} does not exist` })
          const pid = req.params.pid
          if (!pid) return res.status(400).send({ message: 'Product id is mandatory' })
          const isProductInCart = cart.products.find(p => p.id == pid)
          if (isProductInCart) {
            cart.products = cart.products.filter(p => p.id != pid)
          } else {
            return res.status(500).send({ message: `Product with id: ${pid} not found in cart with id: ${cid}` })
          }
          const updatedCartId = await cartsService.updateById(cid, cart)
          if (!updatedCartId) return res.status(500).json({ message: 'Error while updating cart' })
          res.send({ message: `Cart with id: ${updatedCartId} succesfuly updated. Product with id: ${pid} succesfuly deleted` })
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )

export default router