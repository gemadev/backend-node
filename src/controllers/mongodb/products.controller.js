const Router = require("express").Router;
const routerProductos = Router();

const { isAuth } = require("../../middlewares/permisos");


const {
    getAllProducts,
    getProductsById,
    postNewProduct,
    deleteProductById,
    putProductById,
} = require("../../services/products-services");


routerProductos
    .route("/")
    .get( getAllProducts)
    .post( postNewProduct)
;
routerProductos.get('/:id?',  getProductsById);

routerProductos.delete('/:id',  deleteProductById);

routerProductos.put('/:id',  putProductById)

module.exports = routerProductos;