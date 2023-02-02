const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    timestamp: {type: String, required: true, max:50},
    nombre: {type: String, required: true, max:100},
    descripcion: {type: String, required: true, max:400},
    codigo: {type: Number, required: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
    cantidad: {type: Number, require: false}
});

module.exports = ProductSchema;