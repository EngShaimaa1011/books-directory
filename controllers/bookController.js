const Book = require("../models/book");
const AppError = require("../utils/appError");

//1- Get all books
const getBooks = async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

//2- Get one book
const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new AppError("Book not found", 404);
  res.json(book);
};

//3- Create new book
const createBook = async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    throw new AppError("Title and Author are required", 400);
  }
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

//4- Update book
const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) throw new AppError("Book not found", 404);
  res.json(book);
};

// Delete book
const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) throw new AppError("Book not found", 404);
  res.json({ message: "Book deleted" });
};
module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
