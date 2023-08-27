const Book = require('../model/book.model');

// APIs To Get All Books
exports.getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
}

// APIs to Get Book By Id
exports.getBookById = async (req, res) => {
    const book = await Book.findById({_id: req.params.id});
    res.json(book);
}

// APIs To Add new Book 
exports.addNewBook = async (req , res) => {
    const newBook = await Book.create(req.body);
    res.json({status: 201, message: "Book Added Successfully", newBook});
}

// APIs To Update Books
exports.updateBook = async (req, res) => {
    const bookObj = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({status: 200, message: "Book details updated successfully"});
}

// APIs To Delete Book
exports.deleteBook = async (req, res ) => {
    Book.findOneAndRemove({
        _id: req.params.id
    }).then((book) => {
        res.send(book);
    });
}