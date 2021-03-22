const { fetchBook } = require('../booksApiService/fetchBooks');
const { extractText } = require('../computerVisionService/textExtraction');
const { getBookById } = require('../booksApiService/getBookById');
const getCompatScore = require('../recommendationScore/recommScore');
const getRecommendations = require('../recombeeService/getRecommendations');
const addBookView = require('../recombeeService/view');

const getRecommendedBooks = async (req, res) => {
  const user = req.user;
  // const id = 5;
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
    res.status(201).send(retrievedBook);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// change back to auth --- string()
const getBookDetails = async (req, res) => {
  const user = { id: 0 };
  // req.user;

  try {
    const { bookId } = req.params;
    console.log('-----', bookId);
    const retrievedBook = await getBookById(bookId);
    const compatScore = await getCompatScore(user.dataValues, retrievedBook);
    retrievedBook.compatabilityScore = compatScore;
    await addBookView(user.id, bookId.toString());
    res.status(201).send(retrievedDetails);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getRecommendedBooks,
  getBookByCover,
  getBookBySearch,
  getBookDetails,
};
