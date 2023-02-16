const Router = require('koa-router');
const routerCarritos = new Router({
    prefix: '/api/carrito',
});


const {
    getAllCarts,
    postCreateCart,
    deleteCartById,
    getProductsInCart,
    postProducstInCart,
    deleteProductInCartById,
    emptyThisCart,
} = require("../../services/cart-services");


routerCarritos.get('/', getAllCarts);

routerCarritos.post('/',  postCreateCart);

routerCarritos.delete('/:id',  deleteCartById);

routerCarritos.get('/:id/productos',  getProductsInCart);

routerCarritos.post('/:id/productos',  postProducstInCart);

routerCarritos.delete("/:id/productos/:id_prod",  deleteProductInCartById);

routerCarritos.delete('/:id/productos',  emptyThisCart);


module.exports = routerCarritos;
