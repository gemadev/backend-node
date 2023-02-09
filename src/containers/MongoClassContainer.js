const mongoose = require("mongoose");
const { ConnectToMongoDB } = require("../config/config");

ConnectToMongoDB();

class MongoClassContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema)
    }

    getAll = async () => {
        try {
            return await this.collection.find();
        } catch (error) {
            throw new Error("Error", error);
        }
    };

    save = async (element) => {
        try {
            const newElement = new this.collection(element);
            const result = await newElement.save();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    };

    getById = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else {
                const doc = await this.collection.findById(id);
                if (doc !== null) return doc;
                else return null;
            }            
        } catch (error){
            throw new Error("Error pidiendo los datos", error);
        }
    };

    deleteById = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else return await this.collection.findByIdAndDelete({ _id: id });
        } catch (error) {
            throw new Error(error);
        }
    };

    updateById = async (id, producto) => {
        try {
            const productUpdated = await this.collection.findByIdAndUpdate(id, producto, {new: true});
            return productUpdated;
        } catch (error) {
            throw new Error(error);
        }
    }
};

module.exports = MongoClassContainer;