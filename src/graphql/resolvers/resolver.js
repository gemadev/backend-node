const { productsDao, userDao, cartDao } = require("../../daos");

/*
// const MongoDaoProducts = require("../../daos/mongodb/MongoDaoProducts");
// const productos = new MongoDaoProducts();

const getAllProducts = async () => {
    const prods = await productos.getAll()
    return prods;
};
*/

const getAllProducts = async () => {
    const prods = await productsDao.getAll()
    return prods;
};

const getProductById = async ({id: _id}) => {
    const prod = await productsDao.getById(_id);
    return prod;
};

const addProduct = async ({input}) => {
    const newProd = await productsDao.save(input)
    return newProd;
};

const deleteProductById = async ({id: _id}) => {
    const deletedProd = await productsDao.deleteById(_id)
    return deletedProd;
};

const updateProductById = async ({ id, input }) => {
    return productsDao.updateById(id, input);
};

const getUserByEmail = async (userEmail) => {
    const {email} = userEmail;
    const data = await userDao.getByEmail(email);
    return data[0];
};

const getUserCartById = async ({id: _id}) => {
    const userCart = await cartDao.getById(_id)
    return userCart;
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProductById,
    updateProductById,
    getUserByEmail,
    getUserCartById
};