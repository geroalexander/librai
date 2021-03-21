const { Sequelize } = require('sequelize');

function associations(sequelize) {
  const { user, book, rating } = sequelize.models;
  user.belongsToMany(book, { through: rating });
  book.belongsToMany(user, { through: rating });
}

module.exports = associations;

// User now has all these 'getter' methods on them..
// ...and the inverse is also true --> book.getUsers() etc etc
// user.getBooks();
// user.countBooks();
// user.hasBook();
// user.hasBooks();
// user.setBooks();
// user.addBook();
// user.addBooks();
// user.removeBook();
// user.removeBooks();
// user.createBook();

// The getter methods accept options just like the usual finder methods
// const USER = users.findByPk(5);
// const USER = users.findOne({id: req.body.userId})
// user.addBook({bookId, rating: 4, hasRead: true});
// const allReadBooks = await USER.getBooks({
//   where: {
//     rating: {
//       [Op.gte]: 4,
//     },
//   },
// });

// const allSavedBooks = await USER.getBooks({
//   where: {
//     isRead: false,
//   },
// });
