require('dotenv').config();
const mongoose = require('mongoose');
const { logger, loggerError } = require('../logs/winston');

const config = {
    mongoDb: {
        url: `mongodb+srv://coderhouse:35216855@cluster0.rdhrx5i.mongodb.net/ecommerce?authSource=admin&replicaSet=atlas-f50h5x-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
}

const ConnectToMongoDB = () => {
    try {
        mongoose.connect(config.mongoDb.url, config.mongoDb.options);
        logger.log("info", "Connected to MongoDB");
    } catch (error) {
        loggerError.log("error", error.message);
    }
};

module.exports = {config, ConnectToMongoDB};