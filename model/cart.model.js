const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    _userId: { type: String, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
})

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;