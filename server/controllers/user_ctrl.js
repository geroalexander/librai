const getRecommendations = require('../recombeeService/getRecommendations');
const { getBookById } = require('../booksApiService/getBookById');
const { formatBook } = require('./helpers');
const { handleErrors } = require('./errorHandling');
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
    const userWithBooks = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: Book,
    });
    if (!userWithBooks) throw new Error('Could not find user');

    const recommendations = await getRecommendations(user.id, 10);
    if (!recommendations) throw new Error('Recommendation engine error');

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
    handleErrors(error, res);
  }
};

const getUserWithBooks = async (req, res) => {
  const user = req.user;
  try {
    const userWithBooks = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: Book,
    });
    if (!userWithBooks) throw new Error('Could not find user');

    res.status(201).send({
      userWithBooks,
    });
  } catch (error) {
    console.error(error, 'Could not get user with books, fn.getUserWithBooks');
    handleErrors(error, res);
  }
};

const addSavedBook = async (req, res) => {
  const user = req.user;
  try {
    const { book } = req.body;
    if (!Object.keys(book).length || !book) throw new Error('No book received');

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

    let targetBook = await Book.findByPk(id);
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
    if (!targetBook) throw new Error('Book could not be created');

    const savedBook = await user.addBook(targetBook, {
      through: { isSaved: true, compatabilityScore },
    });
    if (!savedBook) throw new Error('Book could not be saved');

    const recombeeRequest = await bookmark(user.id, targetBook);
    console.log('4');
    if (recombeeRequest !== 'Successful')
      throw new Error('Recommendation engine error');

    const userWithBooks = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Book, where: { id } }],
    });
    console.log('5');
    if (!userWithBooks) throw new Error('Could not find user');

    res.status(201).send(userWithBooks.books[0]);
  } catch (error) {
    console.error(error, 'Could not add saved book, fn.addSavedBook');
    handleErrors(error, res);
  }
};

const updateRating = async (req, res) => {
  const user = req.user;
  try {
    const { book, rating } = req.body;
    if (!Object.keys(book).length || !book) throw new Error('No book received');
    if (rating < -1 || rating > 1 || typeof rating !== 'number')
      throw new Error('Invalid book rating');

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

    let targetBook = await Book.findByPk(id);
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
    if (!targetBook) throw new Error('Book could not be created');

    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });

    if (targetInteraction) {
      const updatedBook = await targetInteraction.update({
        rating,
        isSaved: false,
      });
      if (!updatedBook) throw new Error('Rating could not be updated');
      const recombeeRequest = await bookRating(user.id, targetBook, rating); // book object (book.id for id)
      if (recombeeRequest !== 'Rating added')
        throw new Error('Recommendation engine error');
    } else {
      const ratedBook = await user.addBook(targetBook, {
        through: { rating, compatabilityScore, isSaved: false },
      });
      if (!ratedBook) throw new Error('Rated book could not be saved');
      const recombeeRequest = await bookRating(user.id, targetBook, rating); // book object (book.id for id)
      console.log('2', recombeeRequest);
      if (recombeeRequest !== 'Rating added')
        throw new Error('Recommendation engine error');
    }

    const userWithBooks = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Book, where: { id } }],
    });
    if (!userWithBooks) throw new Error('Could not find user');

    res.status(201).send(userWithBooks.books[0]);
  } catch (error) {
    console.error(error, 'Could not update rating, fn.updateRating');
    handleErrors(error, res);
  }
};

const deleteSavedBook = async (req, res) => {
  const user = req.user;

  try {
    const { book } = req.body;
    if (!Object.keys(book).length || !book) throw new Error('No book received');

    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });
    if (!targetInteraction) throw new Error('Interaction does not exist');

    if (targetInteraction.rating !== null) {
      const updatedInteraction = await targetInteraction.update({
        isSaved: false,
      });
      if (!updatedInteraction) throw new Error('Book could not be un-saved');
    } else {
      const deleted = await targetInteraction.destroy();
      if (!deleted) throw new Error('Saved book could not be removed');
    }

    const recombeeRequest = await bookmark(user.id, book);
    if (recombeeRequest !== 'Successful')
      throw new Error('Recommendation engine error');

    res.status(203).send('Book was unsaved');
  } catch (error) {
    console.error(error, 'Could not delete saved book, fn.deleteSavedBook');
    handleErrors(error, res);
  }
};

const deleteRating = async (req, res) => {
  const user = req.user;

  try {
    const { book } = req.body;
    if (!Object.keys(book).length || !book) throw new Error('No book received');

    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId: book.id },
    });
    if (!targetInteraction) throw new Error('Interaction does not exist');

    if (targetInteraction.isSaved) {
      const updatedInteraction = await targetInteraction.update({
        rating: null,
      });
      if (!updatedInteraction)
        throw new Error('Book rating could not be removed');
    } else await targetInteraction.destroy();

    const recombeeRequest = await bookRating(user.id, book);
    if (recombeeRequest !== 'Rating deleted')
      throw new Error('Recommendation engine error');

    res.status(203).send('Book rating was removed');
  } catch (error) {
    console.error(error, 'Could not delete rating, fn.deleteRating');
    handleErrors(error, res);
  }
};

const registrationForm = async (req, res) => {
  const user = req.user;
  try {
    const { books, favoriteGenres } = req.body;

    if (favoriteGenres.length < 3 || favoriteGenres.length > 5)
      throw new Error('Incorrect no. of genres');
    if (books.length < 3) throw new Error('Incorrect no. of books');

    const oldUser = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
    });
    if (!oldUser) throw new Error('Could not find user');

    const updatedUsersFavoriteGenres = await oldUser.update({ favoriteGenres });
    if (!updatedUsersFavoriteGenres)
      throw new Error('Could not update favorite genres');

    for (let i = 0; i < books.length; i++) {
      let targetBook = await Book.findByPk(books[i].id);
      if (!targetBook) targetBook = await Book.create(books[i]);
      if (!targetBook) throw new Error('Book could not be created');
      const ratedBook = await oldUser.addBook(targetBook, {
        through: { rating: 1 },
      });
      if (!ratedBook) throw new Error('Rated book could not be saved');
    }

    const userWithBooks = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
      include: Book,
    });
    if (!userWithBooks) throw new Error('Could not find user');

    res.status(201).send(userWithBooks);
  } catch (error) {
    console.error(
      error,
      'Could not complete registration, fn.registrationForm',
    );
    handleErrors(error, res);
  }
};

const updateProfile = async (req, res) => {
  const user = req.user;
  try {
    const { profilePic = null, favoriteGenres = null, email = null } = req.body;
    const userInformation = await User.findByPK(user.id, {
      attributes: { exclude: ['password'] },
    });

    let updated;
    let profileError = new Error('Profile could not be updated');
    if (email) {
      updated = userInformation.update({ email });
      if (!updated) throw profileError;
    }
    if (favoriteGenres) {
      updated = userInformation.update({ favoriteGenres });
      if (!updated) throw profileError;
    }
    if (profilePic) {
      updated = userInformation.update({ profilePic });
      if (!updated) throw profileError;
    }

    res.sendStatus(201);
  } catch (error) {
    console.error(error, 'Could not update profile information');
    handleErrors(error, res);
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
