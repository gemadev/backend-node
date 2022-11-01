import { Router } from 'express'
import services from "../dao/index.js"
import login from '../middlewares/login.middleware.js'

const router = Router();
const productsService = services.productsService

router
  .route('/')
    .get(
      // Responde con todos los productos.
      async (req, res) => {
        const products = await productsService.getAll()
        res.send(products)
      }
    )
    .post(
      // Para incorporar productos al listado (solo administradores) se debe enviar una petición POST al endpoint /api/products con la siguiente estructura en el body:
      // {
      //   "name": "producto1",
      //   "description": "producto nuevo de prueba",
      //   "thumbnail": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      //   "price": 500,
      //   "stock": 5
      // }
      login,
      async (req, res) => {
        if (!req.body.name || !req.body.description || !req.body.thumbnail || !req.body.price || !req.body.stock) {
          return res.status(400).send({ message: 'Product name, description, code, thumbnail, price, and stock are required' })
        }
        if (!Number(req.body.price) || !Number(req.body.stock)) {
          return res.status(400).send({ message: 'Product price and stock must be numbers' })
        }
        const existingProducts = await productsService.getAll()
        if (existingProducts.find(p => p.name == req.body.name.trim())) {
          return res.status(400).send({ message: 'A product with such name already exists. Cannot save two products with the same name.' })
        }
        const formattedProduct = {
          timestamp: Date.now(),
          name: req.body.name.trim(),
          description: req.body.description.trim(),
          code: Math.random().toString(36).substring(2, 15),
          thumbnail: req.body.thumbnail.trim(),
          price: Number(req.body.price),
          stock: Number(req.body.stock)
        }
        const savedProductId = await productsService.save(formattedProduct)
        if (!savedProductId) return res.status(500).json({ message: 'Error while saving product' })
        res.send({ message: `Product saved with id: ${savedProductId}`})
      }
    )
router
  .route('/:pid')
    .get(
      // Permite listar un producto por su id (disponible para user y admin).
      async (req, res) => {
        const pid = req.params.pid
        if (!pid) return res.status(400).send({ message: 'Product id is mandatory' })
        const product = await productsService.getById(pid)
        if (!product) return res.status(400).send({ message: `Product with id: ${pid} does not exist` })
        res.send(product)
      }
    )
    .put(
      // Para actualizar un producto por su id (disponible para administradores) se debe enviar una petición PUT al endpoint /api/products/:pid con la siguiente estructura en el body:
      // {
      //   "name": "producto1",
      //   "description": "producto actualizado de prueba",
      //   "thumbnail": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      //   "price": 500,
      //   "stock": 5
      // }
      // El id del producto a actualizar (enviado por params) debe coincidir con el id del producto en memoria.
      // Se estampa un nuevo timestamp al producto actualizado.
      // Se conserva el code del producto original.
      login,
      async (req, res) => {
        const pid = req.params.pid
        if (!pid) return res.status(400).send({ message: 'Product id is mandatory' })
        const product = await productsService.getById(pid)
        if (!product) return res.status(400).send({ message: `Product with id: ${pid} does not exist` })
        if (!req.body.name || !req.body.description || !req.body.thumbnail || !req.body.price || !req.body.stock) {
          return res.status(400).send({ message: 'Product name, description, code, thumbnail, price, and stock are required' })
        }
        if (!Number(req.body.price) || !Number(req.body.stock)) {
          return res.status(400).send({ message: 'Product price and stock must be numbers' })
        }
        const formattedProduct = {
          timestamp: Date.now(),
          name: req.body.name.trim(),
          description: req.body.description.trim(),
          code: product.code,
          thumbnail: req.body.thumbnail.trim(),
          price: Number(req.body.price),
          stock: Number(req.body.stock)
        }
        const updatedProductId = await productsService.updateById(pid, formattedProduct)
        if (!updatedProductId) return res.status(500).send({ message: `Error while updating product` })
        res.send({ message: `Product with id: ${updatedProductId} successfully updated` })
      }
    )
    .delete(
      // Permite borrar un producto por su id (solo para administradores).
      login,
      async (req, res) => {
        const pid = req.params.pid
        if (!pid) return res.status(400).send({ message: 'Product id is mandatory' })
        const product = await productsService.getById(pid)
        if (!product) return res.status(400).send({ message: `Product with id: ${pid} does not exist` })
        const deleted = await productsService.deleteById(pid)
        if (!deleted) return res.status(500).send({ message: `There was an error while deleting the product with id: ${pid}` })
        res.send({ message: `Product with id: ${pid} successfully deleted` })
      }
    )

export default router