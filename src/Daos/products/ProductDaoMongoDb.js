
const ProductMongoContainer = require("../../containers/mongodb/ProductMongoContainer");
const ProductSchema = require("../../config/models/ProductSchema");


class ProductDaoMongoDb extends ProductMongoContainer {
    constructor() {
        super('products', ProductSchema)
    }
}

module.exports = ProductDaoMongoDb;