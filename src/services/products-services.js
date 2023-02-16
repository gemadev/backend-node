const { productsDao } = require("../daos");

const productos = productsDao;
const {loggerError}  = require("../logs/winston")


const getAllProducts = async (ctx) => {
    ctx.body = await productos.getAll();
};

const getProductsById = async (ctx) => {
    const id = ctx.request.params.id;
    const product = await productos.getById(id);
    if (product != null) {
        ctx.body = product;
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${ctx.method} a ${ctx.url} Producto ${id} no existe`,
        });
        ctx.response.status = 404;
        return ctx.response.body = {
            status: 404,
            message: `Error Metodo: ${ctx.method} a ${ctx.url} Producto ${id} no exist`,
        }
    };
};

const postNewProduct = async (ctx) => {
    const { nombre, descripcion, precio, stock, foto } = ctx.request.body;

    const newProduct = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        stock: stock,
        foto: foto,
    };

    if (nombre && descripcion && precio && stock && foto) {
        const product = await productos.save(newProduct);
        ctx.response.status = 201;
        return (ctx.response.body = product);
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${ctx.method} a ${ctx.url} Propiedades faltantes`,
        });
        ctx.response.status = 404;
        return (ctx.response.body = {
            message: `Error Metodo: ${ctx.method} a ${ctx.url} Propiedades faltantes`,
        });
    }
};

const deleteProductById = async (ctx) => {
    const id = ctx.request.params.id;
    const product = await productos.getById(id);
    if (product !== null) {
        await productos.deleteById(id);
        ctx.response.status = 201;
        return ctx.response.body = `Producto ID: ${id} borrado`;
    } else {
        loggerError.log({
            level: "error",
            message: `ERROR Producto ID:${id} no encontrado`,
        });
        ctx.response.status = 404;
        return ctx.response.body = {
            status: 404,
            message: `ERROR Producto ID:${id} no encontrado`,
        }
    }
};

const putProductById = async (ctx) => {
    const id = ctx.request.params.id;
    const exist = await productos.getById(id);
    if (exist!== null) {
        const { nombre, descripcion, precio, foto, stock } = ctx.request.body;
        const prod_editado = await productos.updateById((id), {
            nombre,
            descripcion,
            precio,
            foto,
            stock,
        });
        ctx.response.status = 201;
        return ctx.response.body = await productos.getById(id);
    }else{
        ctx.response.status = 404;
        return ctx.response.body = {
            status: 404,
            message: `ERROR Producto ID:${id} no encontrado`,
        };
    }
};

module.exports = {
    getAllProducts,
    getProductsById,
    postNewProduct,
    deleteProductById,
    putProductById
};