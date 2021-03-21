const { books } = require('../models/books.js');
const { interaction } = require('../models/interaction.js');

const getRecommendedBooks = async (req, res) => {
  try {
    const { userID } = req.params;

    // some logic
  } catch (err) {
    console.err(err);
    res.status(400);
    res.send(err);
  }
};

module.exports = {
  getRecommendedBooks,
};
