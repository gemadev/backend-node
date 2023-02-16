
const { cartDao, productsDao } = require("../daos");

const carritos = cartDao;
const productos = productsDao;

const getAllCarts = async (ctx) => {
    const carts = await carritos.getAll()
    if(carts) {
        ctx.response.status = 200;
        ctx.response.body = carts;
    } else {
        ctx.response.status = 404;
        ctx.response.body = { message: "No hay carritos disponibles" };
    }
};

const postCreateCart = async (ctx) => {
    const id = await carritos.createCarrito();
    ctx.response.status = 201;
    ctx.response.body = `Carrito creado con el id: ${id} correctamente`;
};

// const postCreateCart = async (req, res) => {
//     const id = await carritos.createCarrito();
//     res.status(201).send(`Carrito creado con el id: ${id} correctamente`);
// };

const deleteCartById = async (ctx) => {
    const id = ctx.request.params.id;
    const cartDeleted =  await carritos.deleteById(id);
    if (cartDeleted !== null) {
        ctx.response.status = 201;
        ctx.response.body = `Carrito con el ID: ${id} eliminado`
    }else {
        ctx.response.status = 404;
        ctx.response.body = { message: `Error ID:${id} no encontrado` };
    }
};


const getProductsInCart = async (ctx) => {
    const id = ctx.request.params.id;
    const prodInCart = await carritos.getById(id);
    if(prodInCart !== null) {
        ctx.response.status = 200;
        ctx.response.body = prodInCart;
    }else{
        ctx.response.status = 404;
        ctx.response.body = { message: `Error ID cart:${id} no encontrado` };
    }
};

const postProducstInCart = async (ctx) => {
    const id = ctx.request.params.id;
    const { id_prod } = ctx.request.body;
     const carrito = await carritos.getById(id);
     const prod = await productos.getById(id_prod);

     if(prod !== null && carrito !== null) {
        await carritos.addProduct(id, prod)
        ctx.response.status = 200;
        ctx.response.body = await carritos.getById(id)
    }else {
        ctx.response.status = 404;
        ctx.response.body = { message: `Error en ID cart:${id} y/o ID prod:${id_prod}, no encontrado/s` };
    }
};

const deleteProductInCartById = async (ctx) => {
    const id = ctx.request.params.id;
    const {id_prod} = ctx.request.params;
    if(await carritos.deleteProduct(id, id_prod) !== null) {
        ctx.response.status = 201;
        ctx.response.body = `Producto/s ID: ${id_prod} eliminado/s del carrito ID: ${id}`
    } else {
        ctx.response.status = 404;
        ctx.response.body = { message: `Error en ID cart:${id} y/o ID prod:${id_prod}, no encontrado/s` };
    }
};

const emptyThisCart = async (ctx) => {
    const id = req.params.id;
    const prodInCart = await carritos.getById(id);
    if(prodInCart !== null) {
        const result = carritos.deleteAllProductsInCart(id)
        ctx.response.status = 200;
        ctx.response.body = `Carrito ID ${id} vaciado correctamente`;
    } else {
        ctx.response.status = 404;
        ctx.response.body = { message: `Error ID cart:${id} no encontrado` };
    }
};


module.exports = {
    getAllCarts,
    postCreateCart,
    deleteCartById,
    getProductsInCart,
    postProducstInCart,
    deleteProductInCartById,
    emptyThisCart
}