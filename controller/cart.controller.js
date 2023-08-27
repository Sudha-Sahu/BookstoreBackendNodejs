const Cart = require('../model/cart.model');
const Book = require('../model/book.model');

// Get All Books Inside Cart
exports.cartList = async (req, res) => {
    try {
        const cart = await Cart.findOne({ _userId: req.params.id }).populate('books');
        res.send(cart.books);
    } catch (err) {
        res.send({ message: "cart not found" });
    }
}

// Add new books into carts
exports.addBookToCart = async (req, res) => {
    const user_id = req.params.id;
    const book = await Book.findOne({ _id: req.body.book_id });
    try {
        // checking cart for user
        const cartItems = await Cart.findOne({ _userId: user_id });
        if (cartItems) {
            cartItems.books.push(book._id);
            cartItems.save();
            return res.send({ status: 201, cartItems, message: "Book is added to cart" });
        } else {
            let newCart = new Cart({
                _userId: user_id, books: [book._id]
            })
            newCart.save();
            return res.send({ status: 201, newCart, message: "Book is added to cart" });
        }
    } catch (err) {
        res.send({ message: "Book can not be added" });
    }
}

// Delete book from cart
exports.removeBookFromCart = async (req, res) => {
    let user_id = req.params.id;
    let cart_obj = await Cart.findOne({ _userId: user_id });
    let book = await Book.findOne({ _id: req.body.book_id });
    cart_obj.books.pull(book._id);
    cart_obj.save();
    return res.send({ status: 201, message: "Selected book is removed from your cart" });
}