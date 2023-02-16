const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
    author: {
        email: { type: String },
        nombre: { type: String },
        appellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        avatar: { type: String },
        fecha: { type: String },
    },
    text: { type: String },
});


module.exports = MessagesSchema;