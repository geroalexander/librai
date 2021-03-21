import { Sequelize } from 'sequelize';

function associations(sequelize) {
  const { user, book, rating } = sequelize.models;
  user.belongsToMany(book, { through: rating });
  book.belongsToMany(user, { through: rating });
}

export default associations;

// User now has all these 'getter' methods on them..
// ...and the inverse is also true --> book.getUsers() etc etc
user.getBooks();
user.countBooks();
user.hasBook();
user.hasBooks();
user.setBooks();
user.addBook();
user.addBooks();
user.removeBook();
user.removeBooks();
user.createBook();

// The getter methods accept options just like the usual finder methods
const allReadBooks = await user.getBooks({
  where: {
    rating: {
      [Op.gte]: 4,
    },
  },
});

const allSavedBooks = await project.getBooks({
  where: {
    isRead: false,
  },
});
