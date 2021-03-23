const { fetchBook } = require('../booksApiService/fetchBook');
const { extractText } = require('../computerVisionService/textExtraction');
const { getBookById } = require('../booksApiService/getBookById');
const getCompatScore = require('../recommendationScore/recommScore');
const getRecommendations = require('../recombeeService/getRecommendations');
const addBookView = require('../recombeeService/view');

const getRecommendedBooks = async (req, res) => {
  const user = req.user;
  try {
    const recommendations = await getRecommendations(user.id, 10);
    const bookRecArr = [];
    for (const rec of recommendations) {
      const retrievedBook = await getBookById(rec.id);
      retrievedBook.compatabilityScore = 10;
      bookRecArr.push(retrievedBook);
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
    const compatScore = await getCompatScore(user.dataValues, retrievedBook);
    retrievedBook.compatabilityScore = compatScore;
    await addBookView(user.id, retrievedBook, false);
    res.status(201).send(retrievedBook);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const getBookBySearch = async (req, res) => {
  const user = req.user;
  try {
    const { searchQuery } = req.body;
    const retrievedBook = await fetchBook(searchQuery);
    const compatScore = await getCompatScore(user.dataValues, retrievedBook);
    retrievedBook.compatabilityScore = compatScore;
    await addBookView(user.id, retrievedBook, false);
    res.status(201).send(retrievedBook);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

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

module.exports = {
  getRecommendedBooks,
  getBookByCover,
  getBookBySearch,
  viewBookDetails,
};
