const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller');

// id in the endpoints is the userid
router.get('/:id', cartController.cartList);
router.post('/:id', cartController.addBookToCart);
router.delete('/remove_book/:id', cartController.removeBookFromCart);

module.exports = router;