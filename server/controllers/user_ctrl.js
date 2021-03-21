const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getRecomendations = require('../recombeeService/getRecommendations');
const { user } = require('../models/users');
const { books } = require('../models/books');

const loadDashboard = async (req, res) => {
  const { id } = req.user;
  try {
    const userWithBooks = await user.findOne({ where: { id }, include: Book });
    const recommendations = getRecomendations();
    res.status(201).send({
      userWithBooks,
      recommendations,
    });
  } catch (error) {
    console.error(error, 'Could not load dashboard, fn.loadDashboard');
    res.status(400).send(error);
  }
};

const getUserWithBooks = async (req, res) => {
  const { id } = req.user;
  try {
    const userWithBooks = await user.findOne({ where: { id }, include: Book });
    res.status(201).send({
      userWithBooks,
    });
  } catch (error) {
    console.error(error), 'Could not get user with books, fn.getUserWithBooks';
    res.status(400);
    res.send(error);
  }
};

const addSavedBook = async (req, res) => {
  const user = req.user;
  try {
    const { book } = req.body;
    let targetBook = await Book.findOne({ where: { id: book.id } });
    if (!targetBook) targetBook = await Book.create(book);
    await user.addBook(targetBook, { through: { isSaved: true } });
    const userWithBooks = await user.findOne({
      where: { id: user.id },
      include: Book,
    });
    res.status(201).send(userWithBooks);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error);
  }
};

const updateRating = async (req, res) => {
  const user = req.user;
  try {
    const { book, rating } = req.body;

    // check if the  book  exitst
    // if not, create the book
    // if exisits, check if user .has book rating
    //

    // find user info by ID
    // find book by book id with params
    // update read book
    // return read book
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error);
  }
};

const deleteSavedBook = async (req, res) => {
  // get user info from req.user
  try {
    // find user info by ID
    // find book by book id with params
    // delete saved book
    // return new list of saved books
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error);
  }
};

const deleteRating = async (req, res) => {
  // get user info from req.user
  try {
    // find user info by ID
    // find book by book id with params
    // delete read book
    // return new list of read books
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error);
  }
};

module.exports = {
  loadDashboard,
  getUserWithBooks,
  addSavedBook,
  updateRating,
  deleteSavedBook,
  deleteRating,
};
