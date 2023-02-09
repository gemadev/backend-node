
const MongoClassContainer = require("../../containers/MongoClassContainer");
const MessagesSchema = require("../../config/models/MessagesSchema");

let instance;

class MongoDaoMessages extends MongoClassContainer {
    constructor() {
        super('mensajes', MessagesSchema)
    }

    static getInstance() {
        if (instance === undefined) {
            instance = new MongoDaoMessages();
        }
        return instance;
    };

    async save(msj) {
        try {
            const _mensajes = await this.getAll();
            const msj = this.collection(_mensajes)
            const result = await newElement.save(msj);
            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = MongoDaoMessages;