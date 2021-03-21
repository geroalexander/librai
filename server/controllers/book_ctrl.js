const { fetchBooks } = require('../booksApiService/fetchBooks');
const { extractText } = require('../computerVisionService/textExtraction');
const { getBookById } = require('../booksApiService/getBookById');

const getRecomendations = require('../recombeeService/getRecommendations');

const getRecommendedBooks = async (req, res) => {
  // const { id } = req.user;
  const id = 5;
  try {
    const recomendations = getRecommendedBooks(id);
    res.status(201).send(recomendations);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const getBookByCover = async (req, res) => {
  try {
    const { image } = req.body;
    const searchQuery = await extractText(image);
    const retrievedBook = await fetchBooks(searchQuery);
    res.status(201).send(retrievedBook);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const getBookBySearch = async (req, res) => {
  try {
    const { searchQuery } = req.body;
    const retrievedBook = await fetchBooks(searchQuery);
    res.status(201).send(retrievedBook);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const getBookDetails = async (req, res) => {
  try {
    const { bookId } = req.params;
    const retrievedDetails = await getBookById(bookId);
    // call view from recombee api
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
