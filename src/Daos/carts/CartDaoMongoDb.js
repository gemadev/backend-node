const CartMongoDbContainer = require("../../containers/mongodb/CartMongoDbContainer");
const CartShchema = require("../../config/models/CartSchema");


class CartDaoMongoDb extends CartMongoDbContainer {
    constructor() {
        super('carts', CartShchema)
    }
}

module.exports = CartDaoMongoDb;