const mongoose = require("mongoose");

const CartShchema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Number },
    productos: { type: Array },
});

module.exports = CartShchema;