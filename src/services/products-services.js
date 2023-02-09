const { productsDao } = require("../daos");

const productos = productsDao;
const {loggerError}  = require("../logs/winston")

const getAllProducts = async (req, res) => {
    res.status(200).send(await productos.getAll())
};

// const getAllProducts = async (req, res) => {
//     const allProds = await productos.getAll();
//     // res.status(200).json(allProds)
//     return res.json(allProds)
// };

const getProductsById = async (req, res) => {
    const id = req.params.id;
    const productoPorId = await productos.getById(id);
    if (productoPorId !== null) return res.status(200).send(productoPorId);
    else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Producto ${id} no existe`,
        });
        return res.status(404).send(await productos.getAll());
    }
};

const postNewProduct = async (req, res) => {
    const newProd = req.body
    return res.status(201).send(await productos.save(newProd))

};

const deleteProductById = async (req, res) => {
    const id = req.params.id;
    const productoPorId = await productos.getById(id);
    if (productoPorId !== null) {
        await productos.deleteById(id);
        return res.status(201).send(`Producto ID: ${id} borrado`);
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Producto ${id} no existe`,
        });
        return res.status(404).json(`ERROR Producto ID:${id} no encontrado`);
    }
};

const putProductById = async (req, res) => {
    const id = req.params.id;
    const exist = await productos.getById(id);
    if (exist !== null) {
        const { nombre, descripcion, precio, foto, stock } = req.body;
        const prod_editado = await productos.updateById((id), {
            nombre,
            descripcion,
            precio,
            foto,
            stock,
        });
        res.status(201).send(await productos.getById(id));
    } else res.status(404).json(`ERROR ID:${id} no encontrado`);
};

module.exports = {
    getAllProducts,
    getProductsById,
    postNewProduct,
    deleteProductById,
    putProductById
};