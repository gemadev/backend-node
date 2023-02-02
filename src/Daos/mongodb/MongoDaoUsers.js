
const MongoClassContainer = require("../../containers/MongoClassContainer");
const UsuarioSchema = require("../../config/models/UsuarioSchema");

let instance;

class MongoDaoUsers extends MongoClassContainer {
    constructor() {
        super('usuarios', UsuarioSchema)
    }

    static getInstance() {
        if (instance === undefined) {
            instance = new MongoDaoUsers();
        }
        return instance;
    };

    getByEmail = async (email) => {
        try {
            const emailUser = await this.collection.find({email});
            return emailUser;
        } catch (error) {
            throw new Error(error)
        }
    };
}

module.exports = MongoDaoUsers;