

const MongoClassContainer = require("../../containers/MongoClassContainer");
const ProductSchema = require("../../config/models/ProductSchema");

let instance;

class MongoDaoProducts extends MongoClassContainer {
    constructor() {
        super('products', ProductSchema)
    }

    static getInstance() {
        if (instance === undefined) {
            instance = new MongoDaoProducts();
        }
        return instance;
    };

    save = async (element) => {
        try {
            element.timestamp = new Date().toISOString();
            element.codigo = Date.now();
            const newElement = new this.collection(element);
            const result = await newElement.save();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = MongoDaoProducts;