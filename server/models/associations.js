const { Sequelize } = require('sequelize');

function associations(sequelize) {
  const { user, book, interaction } = sequelize.models;
  user.belongsToMany(book, { through: interaction });
  book.belongsToMany(user, { through: interaction });
}

module.exports = associations;
