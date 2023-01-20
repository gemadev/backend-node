const mongoose = require("mongoose");

class UserMongoDbContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    getAll = async () => {
        try {
            return await this.collection.find({});
        } catch (error) {
            throw Error(error);
        }
    }

    async getById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else return await this.collection.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByEmail (email) {
        try {
            const emailUser = await this.collection.find({email});
            return emailUser;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = UserMongoDbContainer;