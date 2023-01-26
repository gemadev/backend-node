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
    .route("/api/productos")
    .get(isAuth, getAllProducts)
    .post(isAuth, postNewProduct)
;
routerProductos.get('/api/productos/:id?', isAuth, getProductsById);

routerProductos.delete('/api/productos/:id', isAuth, deleteProductById);

routerProductos.put('/api/productos/:id', isAuth, putProductById)

module.exports = routerProductos;