const { fetchBook } = require('../booksApiService/fetchBook');
const { extractText } = require('../computerVisionService/textExtraction');
const { getBookById } = require('../booksApiService/getBookById');
const { formatBook } = require('./helpers');
const getCompatScore = require('../recommendationScore/recommScore');
const getRecommendations = require('../recombeeService/getRecommendations');
const addBookView = require('../recombeeService/view');
const { models } = require('../models/index');
const { user, book } = models;
const Book = book;
const User = user;

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
    const retrievedBook = await fetchBook(searchQuery);

    const formattedBook = formatBook(retrievedBook);
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      include: Book,
    });
    const compatScore = await getCompatScore(userWithBooks, formattedBook);
    formattedBook.compatabilityScore = compatScore;
    await addBookView(user.id, retrievedBook, false);
    res.status(201).send(formattedBook);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

//getBookWithScore
// const getBookBySearch = async (req, res) => {
// const getBookWithScore = async (req, res) => {
//   const user = req.user;
//   try {
//     const { googleBook } = req.body;
//     const userWithBooks = await User.findOne({
//       where: { id: user.id },
//       include: Book,
//     });
//     const compatScore = await getCompatScore(userWithBooks, googleBook);

//     const formattedBook = formatBook(googleBook);
//     formattedBook.compatabilityScore = compatScore;
//     await addBookView(user.id, googleBook, false);
//     res.status(201).send(formattedBook);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error);
//   }
// };

// const getBookDetails = async (req, res) => {
//   const user = req.user;
//   try {
//     const { bookId } = req.params;
//     const retrievedBook = await getBookById(bookId);
//     const compatScore = await getCompatScore(user.dataValues, retrievedBook);
//     retrievedBook.compatabilityScore = compatScore;
//     await addBookView(user.id, retrievedBook, false);
//     res.status(201).send(retrievedDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error);
// }

const viewBookDetails = async (req, res) => {
  const user = req.user;
  try {
    const { book } = req.body;
    await addBookView(user.id, book, true);
    res.status(201).send('Viewing is sent');
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
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
    let isFormatted = true;
    let formattedBook = googleBook;

    if (googleBook.volumeInfo) {
      formattedBook = formatBook(googleBook);
      isFormatted = false;
    }
    s;
    const compatScore = await getCompatScore(userWithBooks, formattedBook);
    formattedBook.compatabilityScore = compatScore;
    await addBookView(user.id, formattedBook, isFormatted);
    res.status(201).send(formattedBook);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getRecommendedBooks,
  getBookByCover,
  viewBookDetails,
  getBookWithScore,
};
