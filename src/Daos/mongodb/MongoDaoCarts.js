const mongoose = require("mongoose");
const MongoClassContainer = require("../../containers/MongoClassContainer");
const CartShchema = require("../../config/models/CartSchema");

let instance;

class MongoDaoCarts extends MongoClassContainer {
    constructor() {
        super("carts", CartShchema);
    }

    static getInstance() {
        if (instance === undefined) {
            instance = new MongoDaoCarts();
        }
        return instance;
    };

    createCarrito = async () => {
        try {
            const carritos = await this.getAll();
            if (carritos.length === 0) {
                const carrito = { id: 1, timestamp: Date.now(), productos: [] };
                const newElement = new this.collection(carrito);
                const result = await newElement.save();
                return result._id;
            } else {
                const carrito = {
                    id: carritos.length + 1,
                    timestamp: Date.now(),
                    productos: [],
                };
                const newElement = new this.collection(carrito);
                const result = await newElement.save();
                return result._id;
            }
        } catch (error) {
            throw new Error("Error", error);
        }
    };

    addProduct = async (id, prod) => {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        else {
            const cart = await this.collection.findOne({ _id: id });
            if (cart !== null) {
                const productos = cart.productos;
                const mapOfProdsIds = productos.map((producto) =>
                    JSON.stringify(producto._id)
                );
                const index = mapOfProdsIds.indexOf(JSON.stringify(prod._id));
                // const prodExistInCart = mapOfProdsIds.includes(JSON.stringify(prod._id))

                if (index !== -1) {
                    cart.productos[index].cantidad += 1;
                    const result = await this.collection.findByIdAndUpdate(
                        id,
                        cart
                    );
                    return result;
                } else {
                    prod.cantidad = 1;
                    await cart.productos.push(prod);
                    const result = await this.collection.findByIdAndUpdate(
                        id,
                        cart
                    );
                    return result;
                }
            } else return null;
        }
    };

    getById = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else {
                const carrito = await this.collection.findById(id);
                if (carrito !== null) return carrito.productos;
                else return null;
            }
        } catch (error) {
            throw new Error("Error pidiendo los datos", error);
        }
    };

    deleteProduct = async (id, prodId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else {
                const cart = await this.collection.findOne({ _id: id });
                if (cart !== null) {
                    const productos = cart.productos;
                    const mapOfIndex = productos.map((producto) =>
                        JSON.stringify(producto._id)
                    );
                    const index = mapOfIndex.indexOf(JSON.stringify(prodId));

                    if (index !== -1) {
                        productos.splice(index, 1);
                        const result = await this.collection.findByIdAndUpdate(
                            id,
                            { productos }
                        );
                        return result;
                    } else return null;
                } else return null;
            }
        } catch (error) {
            throw new Error("Error borrando el producto", error);
        }
    };

    deleteAllProductsInCart =  async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else {
                const cart = await this.collection.findOne({ _id: id });
                const productos = cart.productos;
                const emptyThis = productos.slice(productos.length)
                const result = await this.collection.findByIdAndUpdate(id, { productos: emptyThis });
                
                return result;
            }
        } catch (error) {
            throw new Error("Error borrando todos los producto en este carrito", error);
        }
    }
}

module.exports = MongoDaoCarts;