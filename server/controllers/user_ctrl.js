const getRecomendations = require('../recombeeService/getRecommendations');
const { models } = require('../models/index');
const { user, book, interaction } = models;
const Book = book;
const User = user;
const Interaction = interaction;

// AUTH IS NEEDED. user comes from req.user not form req.body

const loadDashboard = async (req, res) => {
  // const { id } = req.user;
  const user = { id: 5 };

  try {
    const userWithBooks = await User.findOne({ where: { id }, include: Book });
    // takes second param: count. default to 5
    const recommendations = getRecomendations(user.id, _); // change user.id to id when auth used
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
  // const { id } = req.user;
  const user = { id: 5 };
  try {
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      include: Book,
    }); // change user.id to id when auth used
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
  // const user = { id: 5 };

  try {
    const { book } = req.body;
    let targetBook = await Book.findOne({ where: { id: book.id } });

    if (!targetBook) targetBook = await Book.create(book);
    await user.addBook(targetBook, { through: { isSaved: true } });
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      include: Book,
    });
    // call add bookmark function from recombee controller
    res.status(201).send(userWithBooks);
  } catch (error) {
    console.error(error, 'Could not add saved book, fn.addSavedBook');
    res.status(400).send(error);
  }
};

const updateRating = async (req, res) => {
  // const user = req.user;
  const user = { id: 5 };

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
      // call update rating from recombee api
      res.status(203).send(targetInteraction);
    }

    await targetUser.addBook(targetBook, { through: { rating: rating } });
    const userWithBooks = await User.findOne({
      where: { id: user.id },
      include: Book,
    });
    // call add rating from recombee api
    res.status(201).send(userWithBooks);
  } catch (error) {
    console.error(error, 'Could not update rating, fn.updateRating');
    res.status(400).send(error);
  }
};

const deleteSavedBook = async (req, res) => {
  // get user info from req.user
  const user = { id: 5 };

  try {
    const bookId = req.body; //change later
    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId },
    });

    if (!targetInteraction)
      res
        .status(404)
        .send('This interaction does not exist, fn.deleteSavedBook');

    if (targetInteraction.rating !== null)
      await targetInteraction.update({ isSaved: false });
    else await targetInteraction.destroy();

    // call delete bookmark from recombee api
    res.status(203).send('Book was unsaved');
  } catch (error) {
    console.error(error, 'Could not delete saved book, fn.deleteSavedBook');
    res.status(400);
    res.send(error);
  }
};

const deleteRating = async (req, res) => {
  // get user info from req.user
  const user = { id: 5 };

  try {
    const bookId = req.body; // change later\
    const targetInteraction = await Interaction.findOne({
      where: { userId: user.id, bookId },
    });

    if (!targetInteraction)
      res.status(404).send('This interaction does not exist, fn.deleteRating');

    if (targetInteraction.isSaved)
      await targetInteraction.update({ rating: null });
    else await targetInteraction.destroy();

    // call delete rating from recombee
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
