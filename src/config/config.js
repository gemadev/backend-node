require('dotenv').config();


const config = {
    mongoDb: {
        url: `mongodb+srv://coderhouse:35216855@cluster0.rdhrx5i.mongodb.net/ecommerce?authSource=admin&replicaSet=atlas-f50h5x-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    // fileSystem: {
    //     dirProducts: './src/controllers/files/productos.json',
    //     dirCarts: './src/controllers/files/carts.json'
    // }
}

module.exports = config;