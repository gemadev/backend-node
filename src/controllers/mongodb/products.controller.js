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
routerProductos.get('/:id?', isAuth ,getProductsById);

routerProductos.delete('/:id', isAuth, deleteProductById);

routerProductos.put('/:id', isAuth, putProductById)

module.exports = routerProductos;