const getRecommendations = require('../recombeeService/getRecommendations');
const { getBookById } = require('../booksApiService/getBookById');
const { formatBook } = require('./helpers');
const bookmark = require('../recombeeService/bookmark');
const bookRating = require('../recombeeService/rate');
const { models } = require('../models/index');
const { user, book, interaction } = models;
const Book = book;
const User = user;
const Interaction = interaction;

const loadDashboard = async (req, res) => {
  const user = req.user;
  try {
    const userFromDB = await User.findOne({
      where: { id: user.id },
      include: Book,
    });
    const recommendations = await getRecommendations(user.id, 10);
    const bookRecArr = [];
    for (const rec of recommendations.recomms) {
      const retrievedBook = await getBookById(rec.id);
      const formattedBook = formatBook(retrievedBook);
      formattedBook.compatabilityScore = 10;
      bookRecArr.push(formattedBook);
    }
    const {
      id,
      firstName,
      lastName,
      email,
      profilePic,
      favoriteGenres,
      books,
    } = userFromDB;

    const userWithBooks = {
      id,
      firstName,
      lastName,
      email,
      profilePic,
      favoriteGenres,
      books,
    };

    res.status(201).send({
      userWithBooks,
      recommendations: bookRecArr,
    });
  } catch (error) {
    console.error(error, 'Could not load dashboard, fn.loadDashboard');
    res.status(400).send(error);
  }
};

const getUserWithBooks = async (req, res) => {
  const user = req.user;
  try {
    const userFromDB = await User.findOne({
      where: { id: user.id },
      include: Book,
    });

    const {
      id,
      firstName,
      lastName,
      email,
      profilePic,
      favoriteGenres,
      books,
    } = userFromDB;

    const userWithBooks = {
      id,
      firstName,
      lastName,
      email,
      profilePic,
      favoriteGenres,
      books,
    };

    res.status(201).send({
      userWithBooks,
    });
  } catch (error) {
    console.error(error, 'Could not get user with books, fn.getUserWithBooks');
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
    // const userWithBooks = await User.findOne({
    //   where: { id: user.id },
    //   include: Book,
    // });
    await bookmark(user.id, targetBook); // book object (book.id for id)
    res.status(201).send(targetBook);
  } catch (error) {
    console.error(error, 'Could not add saved book, fn.addSavedBook');
    res.status(400).send(error);
  }
};

const updateRating = async (req, res) => {
  const user = req.user;
  try {
    const { book, rating } = req.body;
    let targetBook = await Book.findOne({ where: { id: book.id } });
    if (!targetBook) targetBook = await Book.create(book);
    //only bc we arent using middleware rn --- otherwise user.findOne
    const targetUser = await User.findOne({ where: { id: user.id } });
    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });
    if (targetInteraction) {
      await targetInteraction.update({ rating: rating });
      // await bookRating(user.id, book, rating); // book object (book.id for id)
      res.status(203).send(targetInteraction);
    }
    await targetUser.addBook(targetBook, { through: { rating: rating } });
    // const userWithBooks = await User.findOne({
    //   where: { id: user.id },
    //   include: Book,
    // });
    // await bookRating(user.id, targetBook, rating); // book object (book.id for id)
    res.status(201).send(targetBook);
  } catch (error) {
    console.error(error, 'Could not update rating, fn.updateRating');
    res.status(400).send(error);
  }
};

const deleteSavedBook = async (req, res) => {
  const user = req.user;

  try {
    const { book } = req.body;
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

    await bookmark(user.id, book);
    res.status(203).send('Book was unsaved');
  } catch (error) {
    console.error(error, 'Could not delete saved book, fn.deleteSavedBook');
    res.status(400);
    res.send(error);
  }
};

const deleteRating = async (req, res) => {
  const user = req.user;

  try {
    const { book } = req.body; //
    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });

    if (!targetInteraction)
      res.status(404).send('This interaction does not exist, fn.deleteRating');

    if (targetInteraction.isSaved)
      await targetInteraction.update({ rating: null });
    else await targetInteraction.destroy();

    await bookRating(user.id, book, (rating = 0));
    res.status(203).send('Book rating was removed');
  } catch (error) {
    console.error(error, 'Could not delete rating, fn.deleteRating');
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
