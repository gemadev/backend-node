const fs = require('fs');
const path = require('path');

const { Router } = require('express')

const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')


const {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProductById,
    updateProductById,
    getUserByEmail,
    getUserCartById,
} = require("./resolvers/resolver");

const { isAuth } = require('../middlewares/permisos');//user loggeado, que exista session

const schemaContenido = fs.readFileSync(path.join(__dirname,'./schemas/schemas.gql')).toString();

const schema = buildSchema(schemaContenido)

const graphMiddleware = graphqlHTTP({
    schema: schema,
    rootValue: {
        getAllProducts: getAllProducts,
        getProductById: getProductById,
        addProduct: addProduct,
        deleteProductById: deleteProductById,
        updateProductById: updateProductById,
        getUserByEmail: getUserByEmail,
        getUserCartById: getUserCartById
    },
    graphiql: true
})

const routerGraphql = Router();

routerGraphql.use('/graphql', isAuth ,graphMiddleware)

module.exports = routerGraphql;