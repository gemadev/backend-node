
const UserMongoDbContainer = require("../../containers/mongodb/UserMongoDbContainer");

const UsuariosSchema = require('../../config/models/UsuarioSchema')

class UserDaoMongoDb extends UserMongoDbContainer {
    constructor() {
        super('usuarios', UsuariosSchema)
    }
}

module.exports = UserDaoMongoDb;