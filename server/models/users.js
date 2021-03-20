const { DataTypes } = require('sequelize');
const { STRING, INTEGER, ARRAY } = DataTypes;

module.exports = (sequelize) => {
  return sequelize.define('user', {
    // sequelize adds id prop, createdAt, updatedAt, and also deletedAt if paranoid: true
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      // This would need to be hashed in the future or changed to OAuth
      type: STRING,
      allowNull: false,
    },
    profilePic: {
      type: STRING,
    },
    favoriteGenres: {
      type: ARRAY(STRING),
      allowNull: false,
    },
    savedBooks: {
      type: ARRAY(INTEGER),
      default: [],
    },
  });
};
