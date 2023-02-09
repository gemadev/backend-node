const Router = require("express").Router;
const routerCarritos = Router();

const { isAuth } = require("../../middlewares/permisos");

const {
    getAllCarts,
    postCreateCart,
    deleteCartById,
    getProductsInCart,
    postProducstInCart,
    deleteProductInCartById,
    emptyThisCart,
} = require("../../services/cart-services");


routerCarritos.get('/', isAuth, getAllCarts);

routerCarritos.post('/', isAuth, postCreateCart);

routerCarritos.delete('/:id', isAuth, deleteCartById);

routerCarritos
    .route("/:id/productos")
    .get(isAuth, getProductsInCart)
    .post(isAuth, postProducstInCart)
    .delete(isAuth, emptyThisCart)

routerCarritos.delete("/:id/productos/:id_prod", isAuth, deleteProductInCartById);

module.exports = routerCarritos;
