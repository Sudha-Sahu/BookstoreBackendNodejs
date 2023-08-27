const express = require('express');
const router = express.Router();
const bookController = require('../controller/book.controller');

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.addNewBook);
router.delete("/:id", bookController.deleteBook);
router.patch("/:id", bookController.updateBook);

module.exports = router;