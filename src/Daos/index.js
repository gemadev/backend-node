require("dotenv").config()

let productos
let carritos
let usuarios

switch (process.env.DB_HOST) {
	case "mongodb":
		const CartDaoMongoDb = require("./carts/CartDaoMongoDb");
		const ProductDaoMongoDb = require("./products/ProductDaoMongoDb");
		const UserDaoMongoDb = require("./user/UserDaoMongoDb");

		carritos = new CartDaoMongoDb();
		productos = new ProductDaoMongoDb();
		usuarios = new UserDaoMongoDb();
		break;

	default:
		throw new Error("No se ha definido una conexión a la base de datos");
		break;
}

const productsDao = productos;
const cartDao = carritos;
const userDao = usuarios;

module.exports = { productsDao, cartDao, userDao };