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
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
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
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
      include: Book,
    });

    res.status(201).send({
      userWithBooks,
    });
  } catch (error) {
    console.error(error, 'Could not get user with books, fn.getUserWithBooks');
    res.status(400).send(error);
  }
};

const addSavedBook = async (req, res) => {
  const user = req.user;
  try {
    const { book } = req.body;
    const { compatabilityScore } = book;
    const {
      id,
      authors,
      title,
      subtitle,
      description,
      pageCount,
      categories,
      publisher,
      publishedDate,
      averageRating,
      ratingsCount,
      thumbnail,
      smallThumbnail,
      price,
      currency,
    } = book;

    let targetBook = await Book.findOne({ where: { id } });

    if (!targetBook)
      targetBook = await Book.create({
        id,
        authors,
        title,
        subtitle,
        description,
        pageCount,
        categories,
        publisher,
        publishedDate,
        averageRating,
        ratingsCount,
        thumbnail,
        smallThumbnail,
        price,
        currency,
      });

    await user.addBook(targetBook, {
      through: { isSaved: true, compatabilityScore },
    });

    await bookmark(user.id, targetBook);
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
      include: [{ model: Book, where: { id } }],
    });
    res.status(201).send(userWithBooks.books[0]);
  } catch (error) {
    console.error(error, 'Could not add saved book, fn.addSavedBook');
    res.status(400).send(error);
  }
};

const updateRating = async (req, res) => {
  const user = req.user;
  try {
    const { book, rating } = req.body;
    const { compatabilityScore } = book;
    const {
      id,
      authors,
      title,
      subtitle,
      description,
      pageCount,
      categories,
      publisher,
      publishedDate,
      averageRating,
      ratingsCount,
      thumbnail,
      smallThumbnail,
      price,
      currency,
    } = book;

    let targetBook = await Book.findOne({ where: { id } });
    if (!targetBook)
      targetBook = await Book.create({
        id,
        authors,
        title,
        subtitle,
        description,
        pageCount,
        categories,
        publisher,
        publishedDate,
        averageRating,
        ratingsCount,
        thumbnail,
        smallThumbnail,
        price,
        currency,
      });

    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });

    if (targetInteraction) {
      await targetInteraction.update({ rating, isSaved: false });
      await bookRating(user.id, targetBook, rating); // book object (book.id for id)
    } else {
      await user.addBook(targetBook, {
        through: { rating, compatabilityScore, isSaved: false },
      });
      await bookRating(user.id, targetBook, rating); // book object (book.id for id)
    }
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
      include: [{ model: Book, where: { id } }],
    });
    res.status(201).send(userWithBooks.books[0]);
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
    res.status(400).send(error);
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
    res.status(400).send(error);
  }
};

const registrationForm = async (req, res) => {
  const user = req.user;
  try {
    const { books, rating } = req.body;
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
    });
    await userWithBooks.update({ favoriteGenres });

    for (let i = 0; i < books.length; i++) {
      const targetBook = await Book.create(books[i]);
      await user.addBook(targetBook, { through: { rating: rating[i] } });
    }

    res.send(userWithBooks);
  } catch (error) {
    console.error(
      error,
      'Could not complete registration, fn.registrationForm',
    );
    res.status(400).send(error);
  }
};

const updateProfile = async (req, res) => {
  const user = req.user;
  try {
    const { profilePic = null, favoriteGenres = null, email = null } = req.body;
    const userInformation = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
    });
    if (email) userInformation.update({ email });
    if (favoriteGenres) userInformation.update({ favoriteGenres });
    if (profilePic) userInformation.update({ profilePic });
    res.status(201).send();
  } catch (error) {
    console.error(error, 'Could not update profile information');
    res.status(400).send(error);
  }
};

module.exports = {
  loadDashboard,
  getUserWithBooks,
  addSavedBook,
  updateRating,
  deleteSavedBook,
  deleteRating,
  registrationForm,
  updateProfile,
};
