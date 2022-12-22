import { Router } from 'express'
import services from "../dao/index.js"
// middlewares:
import isAdmin from '../middlewares/isAdmin.middleware.js'
import { uploader } from '../utils/uploader.js'
import { apiErrorLogger } from '../middlewares/logger.middleware.js'

const router = Router();
const productsService = services.productsService

router
  .route('/')
    .get(
      async (req, res) => {
        try {
          const code = req.query.code
          if (code) {
            const product = await productsService.getByCode(code)
            return res.send(product)
          }
          const products = await productsService.getAll()
          res.send(products)
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
    .post(
      isAdmin,
      uploader.single('file'),
      async (req, res) => {
        try {
          let newProduct = req.body
          newProduct.thumbnail = req.file.filename
          if (!req.file) return res.status(500).json({ status: 'error', error: 'Could not upload file' })
          if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.stock) return res.status(400).send({ status: 'error', error: 'Product name, price, description and stock are required' })
          if (!req.body.name || !req.body.description || !req.body.thumbnail || !req.body.price || !req.body.stock) return res.status(400).send({ message: 'Product name, description, code, thumbnail, price, and stock are required' })
          if (!Number(req.body.price) || !Number(req.body.stock)) return res.status(400).send({ message: 'Product price and stock must be numbers' })
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
          const savedProduct = await productsService.getById(savedProductId)
          const io = req.app.get('socketio')
          io.emit('fetchProducts')
          io.emit('newProduct')
          res.send({ status: 'success', message: `Product added with id: ${savedProductId}`, product: savedProduct })
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
    .put(
      isAdmin,
      uploader.single('file'),
      async (req, res) => {
        try {
          const code = req.body.code
          if (!code) return res.status(400).send({ message: 'Product code is mandatory' })
          const product = await productsService.getByCode(code)
          console.log(product)
          if (!product) return res.status(400).send({ message: `Product with code: ${code} does not exist` })
          if (req.body.price) {
            if (!Number(req.body.price)) {
              return res.status(400).send({ message: 'Product price must be a number' })
            }
          }
          if (req.body.stock) {
            if (!Number(req.body.stock)) {
              return res.status(400).send({ message: 'Product stock must be a number' })
            }
          }
          const formattedName = req.body.name ? req.body.name.trim() : product.name
          const formattedProduct = {
            timestamp: Date.now(),
            name: formattedName,
            description: req.body?.description ? req.body.description.trim() : product.description,
            code: product.code,
            thumbnail: req.file?.filename ? req.file.filename.trim() : product.thumbnail,
            price: req.body.price ? Number(req.body.price) : product.price,
            stock: req.body.stock ? Number(req.body.stock) : product.stock
          }
          console.log(formattedProduct)
          const updatedProductCode = await productsService.updateByCode(code, formattedProduct)
          if (!updatedProductCode) return res.status(500).send({ message: `Error while updating product` })
          const io = req.app.get('socketio')
          io.emit('fetchProducts')
          io.emit('editedProduct')
          res.send({ status: 'success', message: `Product with Code: ${updatedProductCode} successfully updated`, product: formattedProduct })
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
    .delete(
      // Permite borrar un producto por su codigo (disponible para administradores).
      isAdmin,
      async (req, res) => {
        try {
          const code = req.query.code
          if (!code) return res.status(400).send({ status: "error", message: "Product's code is mandatory" })
          const product = await productsService.getByCode(code)
          if (!product) return res.status(400).send({ status: "error", message: `Product with code: ${code} does not exist` })
          const deleted = await productsService.deleteByCode(code)
          if (!deleted) return res.status(500).send({ status: "error", message: `There was an error while deleting the product with code: ${code}` })
          const io = req.app.get('socketio')
          io.emit('fetchProducts')
          io.emit('deletedProduct')
          res.send({ status: "success", message: `Product with code: ${code} successfully deleted` })
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )
router
  .route('/:code')
    .get(
      // Permite listar un producto por su codigo (disponible para usuarios y administradores).
      async (req, res) => {
        try {
          console.log(req)
          const pid = req.params.pid
          if (!pid) return res.status(400).send({ message: 'Product id is mandatory' })
          const product = await productsService.getById(pid)
          if (!product) return res.status(400).send({ message: `Product with id: ${pid} does not exist` })
          res.send(product)
        } catch (error) {
          req.error = error
        }
      },
      apiErrorLogger
    )

export default router