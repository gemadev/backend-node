import { Router } from 'express';
import ProductManager from '../managers/productManager.js';
import uploader from '../utils/fileUploader.js';

const router = Router();
const productService = new ProductManager('src/public/data/products.json');

// Consigna 1, mostrar todos los productos:
router.get('/', async (req, res) => {
  let products = await productService.getAll();
  console.log(products)
  res.send(products);
})

// Consigna 2, mostrar un producto por id:
router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  if (isNaN(pid)) return res.status(400).send({ status: 'error', error: 'El parámetro debe ser un número' });
  const parsedPid = parseInt(pid);
  let products = await productService.getAll();
  let product = products.find(obj => obj.id === parsedPid);
  if (!product) return res.status(400).send({ status: 'error', error: `El producto con id: ${parsedPid} no existe` });
  res.send({ product });
})

// Consigna 3, crear un nuevo producto:
router.post('/', uploader.single('file'), async (req, res) => {
  let newProduct = req.body
  newProduct.thumbnail = req.file.path
  if (!newProduct.title || !newProduct.price) return res.status(400).send({ status: 'error', error: 'Product name and price are required' })
  const savedProductId = await productService.save(newProduct);
  const savedProduct = await productService.getById(savedProductId);
  res.send({ status: 'success', message: `Product added with id: ${savedProductId}`, product: savedProduct });
})

// Consigna 4, actualizar un producto por id:
router.put('/:pid', uploader.single('file'), async (req, res) => {
  const pid = req.params.pid;
  if (isNaN(pid)) return res.status(400).send({ status: 'error', error: 'El parámetro debe ser un número' });
  const parsedPid = parseInt(pid);
  let products = await productService.getAll();
  let product = products.find(obj => obj.id === parsedPid);
  if (!product) return res.status(400).send({ status: 'error', error: `El producto con id: ${parsedPid} no existe` });
  let updatedProduct = req.body;
  updatedProduct.id = parsedPid;
  updatedProduct.thumbnail = req.file.path;
  if (!updatedProduct.title || !updatedProduct.price) return res.status(400).send({ status: 'error', error: 'Product name and price are required' })
  await productService.update(updatedProduct);
  const updatedProductFromDB = await productService.getById(parsedPid);
  res.send({ status: 'success', message: `Product updated with id: ${parsedPid}`, product: updatedProductFromDB });
})

// Consigna 5, eliminar un producto por id:
router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  if (isNaN(pid)) return res.status(400).send({ status: 'error', error: 'El parámetro debe ser un número' });
  const parsedPid = parseInt(pid);
  let products = await productService.getAll();
  let product = products.find(obj => obj.id === parsedPid);
  if (!product) return res.status(400).send({ status: 'error', error: `El producto con id: ${parsedPid} no existe` });
  await productService.deleteById(parsedPid);
  res.send({ status: 'success', message: `Product with id: ${parsedPid} has been deleted succesfully` });
})

export default router;