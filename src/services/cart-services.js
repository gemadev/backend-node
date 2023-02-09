
const { cartDao, productsDao } = require("../daos");

const carritos = cartDao;
const productos = productsDao;

const getAllCarts = async (req, res) => {
    carts = await carritos.getAll()
    carts
        ? res.status(200).send(carts)
        : res.status(404).json({ message: "No hay carritos disponibles" });
};

const postCreateCart = async (req, res) => {
    const id = await carritos.createCarrito();
    res.status(201).send(`Carrito creado con el id: ${id} correctamente`);
};

const deleteCartById = async (req, res) => {
    const id = req.params.id;
    await carritos.deleteById(id) !== null
        ? res.status(201).send(`Carrito con el ID: ${id} eliminado`)
        : res.status(404).send(`Error ID:${id} no encontrado`);
};

const getProductsInCart = async (req, res) => {
    const id = req.params.id;
    const prodInCart = await carritos.getById(id);
    prodInCart !== null
        ? res.status(200).send(prodInCart)
        : res.status(404).send(`Error ID cart:${id} no encontrado`);
};

const postProducstInCart = async (req, res) => {
    const id = req.params.id;
    const { id_prod } = req.body;
    const carrito = await carritos.getById(id);
    const prod = await productos.getById(id_prod);
    if (prod !== null && carrito !== null) {
        await carritos.addProduct(id, prod)
        res.status(201).send(await carritos.getById(id));
    } else {
        res.status(404).send(`Error en ID cart:${id} y/o ID prod:${id_prod}, no encontrado/s`);
    }
};

const deleteProductInCartById = async (req, res) => {
    const id = req.params.id;
    const {id_prod} = req.params;
    (await carritos.deleteProduct(id, id_prod)) !== null
        ? res.status(201).send(`Producto/s ID: ${id_prod} eliminado/s del carrito ID: ${id}`)
        : res.status(404).send(`Error en ID cart:${id} y/o ID prod:${id_prod}, no encontrado/s`);
};

const emptyThisCart = async (req, res) => {
    const id = req.params.id;
    const prodInCart = await carritos.getById(id);
    if(prodInCart !== null) {
        const result = carritos.deleteAllProductsInCart(id)
        res.status(200).send(`Carrito ID ${id} vaciado correctamente`)
    }else res.status(404).send(`Error ID cart:${id} no encontrado`);
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