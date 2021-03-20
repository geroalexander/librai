const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

module.exports = (sequelize) => {
  return sequelize.define('user', {
    // sequelize adds id prop, createdAt, updatedAt, and also deletedAt if paranoid: true
    userId: {
      type: INTEGER,
      allowNull: false,
    },
    bookId: {
      type: INTEGER,
      allowNull: false,
    },
    rating: {
      type: INTEGER,
      allowNull: false,
    },
    // createdAt
    // updatedAt
  });
};
