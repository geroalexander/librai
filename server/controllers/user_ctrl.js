const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getRecomendations = require('../recombeeService/getRecommendations');
const { models } = require('../models/index');
const { user, book, interaction } = models;
const Book = book;
const User = user;
const Interaction = interaction;

// AUTH IS NEEDED. user comes from req.user not form req.body

const loadDashboard = async (req, res) => {
  const { id } = req.user;
  try {
    const userWithBooks = await User.findOne({ where: { id }, include: Book });
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
    const userWithBooks = await User.findOne({ where: { id }, include: Book });
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
    let targetBook = await book.findOne({ where: { id: Book.id } });
    if (!targetBook) targetBook = await Book.create(book);
    await User.addBook(targetBook, { through: { isSaved: true } });
    const userWithBooks = await User.findOne({
      where: { id: User.id },
      include: Book,
    });
    res.status(201).send(userWithBooks);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const updateRating = async (req, res) => {
  // const user = req.user;
  try {
    const { book, rating, user } = req.body;
    let targetBook = await Book.findOne({ where: { id: book.id } });
    if (!targetBook) targetBook = await Book.create(book);

    //only bc we arent using middleware rn --- otherwise user.findOne
    const targetUser = await User.findOne({ where: { id: user.id } });

    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });

    if (targetInteraction) {
      await targetInteraction.update({ rating: rating });
      res.status(203).send(targetInteraction);
    }

    await targetUser.addBook(targetBook, { through: { rating: rating } });
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      include: Book,
    });
    res.status(201).send(userWithBooks);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const deleteSavedBook = async (req, res) => {
  // get user info from req.user
  try {
    const { book, user } = req.body; //change later

    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });

    if (!targetInteraction)
      res
        .status(404)
        .send('This interaction does not exist, fn.deleteSavedBook');

    if (targetInteraction.rating !== null)
      await targetInteraction.update({ isSaved: false });
    else await targetInteraction.destroy();

    res.status(203).send('Book was unsaved');
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error);
  }
};

const deleteRating = async (req, res) => {
  // get user info from req.user
  try {
    const { book, user } = req.body;

    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });

    if (!targetInteraction)
      res.status(404).send('This interaction does not exist, fn.deleteRating');

    if (targetInteraction.isSaved)
      await targetInteraction.update({ rating: null });
    else await targetInteraction.destroy();

    res.status(203).send('Book rating was removed');
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
