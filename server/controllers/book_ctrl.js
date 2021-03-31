const { fetchBook } = require('../booksApiService/fetchBook');
const { extractText } = require('../computerVisionService/textExtraction');
const { getBookById } = require('../booksApiService/getBookById');
const { formatBook } = require('./helpers');
const getCompatScore = require('../recommendationScore/recommScore');
const getRecommendations = require('../recombeeService/getRecommendations');
const addBookView = require('../recombeeService/view');
const { models } = require('../models/index');
const { handleErrors } = require('./errorHandling');
const { user, book } = models;
const Book = book;
const User = user;

// Currently unused
const getRecommendedBooks = async (req, res) => {
  const user = req.user;
  try {
    const recommendations = await getRecommendations(user.id, 10);
    const bookRecArr = [];
    for (const rec of recommendations.recomms) {
      const retrievedBook = await getBookById(rec.id);
      const formattedBook = formatBook(retrievedBook);
      formattedBook.compatabilityScore = 10;
      bookRecArr.push(formattedBook);
    }
    res.status(201).send(bookRecArr);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const getBookByCover = async (req, res) => {
  const user = req.user;
  try {
    const { image } = req.body;
    const searchQuery = await extractText(image);
    if (!searchQuery.length) throw new Error('No search query')
    const retrievedBook = await fetchBook(searchQuery);
    if (retrievedBook === 'Books not retrieved') throw new Error('Could not fetch book')
    const formattedBook = formatBook(retrievedBook);
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      include: Book,
    });
    if (!userWithBooks) throw new Error('Could not find user');
    const compatScore = await getCompatScore(userWithBooks, formattedBook);
    formattedBook.compatabilityScore = compatScore;
    const addView = await addBookView(user.id, retrievedBook, false);
    if (addView !== 'View added') throw new Error('Recommendation engine error');
    res.status(200).send(formattedBook);
  } catch (error) {
    console.error(error);
    handleErrors(error, res);
  }
};

const viewBookDetails = async (req, res) => {
  const user = req.user;
  try {
    const { book } = req.body;
    if (!Object.keys(book).length) throw new Error('No book received')
    const recombeeRequest = await addBookView(user.id, book, true);
    if (recombeeRequest !== 'View added') throw new Error('Recommendation engine error')
    res.status(201).send({ message: 'Viewing is sent' });
  } catch (error) {
    console.error(error);
    handleErrors(error, res)
  }
};

const getBookWithScore = async (req, res) => {
  const user = req.user;
  try {
    const { googleBook } = req.body;
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      include: Book,
    });
    if (!userWithBooks) throw new Error('Could not find user');

    let isFormatted = true;
    let formattedBook = googleBook;

    if (googleBook.volumeInfo) {
      formattedBook = formatBook(googleBook);
      isFormatted = false;
    }
    const compatScore = await getCompatScore(userWithBooks, formattedBook);
    formattedBook.compatabilityScore = compatScore;
    const recombeeRequest = await addBookView(user.id, formattedBook, isFormatted);
    if (recombeeRequest !== 'View added') throw new Error('Recommendation engine error');
    res.status(201).send(formattedBook);
  } catch (error) {
    console.error(error);
    handleErrors(error, res)
  }
};


module.exports = {
  getRecommendedBooks,
  getBookByCover,
  viewBookDetails,
  getBookWithScore,
};
