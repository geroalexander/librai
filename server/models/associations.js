import { Sequelize } from 'sequelize';

function associations(sequelize) {
  const { user, book, rating } = sequelize.models;

  // User has many books - ??? saved books array

  // Users have many ratings
  // Ratings have one user
  user.hasMany(rating);
  rating.belongsTo(user, {
    foreignKey: {
      allowNull: false, // rating.userId
    },
  });

  // Books have many ratings
  // Ratings have one book
  book.hasMany(rating);
  rating.belongsTo(book, {
    foreignKey: {
      allowNull: false, // rating.bookId
    },
  });
}

export default associations;
