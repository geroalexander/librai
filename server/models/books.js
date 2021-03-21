const { DataTypes } = require('sequelize');
const { STRING, INTEGER, FLOAT, TEXT, ARRAY, DATEONLY, BOOLEAN } = DataTypes;

module.exports = (sequelize) => {
  return sequelize.define(
    'book',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      author: {
        type: ARRAY(STRING),
      },
      title: {
        type: STRING,
        allowNull: false,
      },
      subtitle: {
        type: STRING,
      },
      description: {
        type: TEXT,
      },
      pageCount: {
        type: INTEGER,
      },
      categories: {
        type: ARRAY(STRING),
      },
      publisher: {
        type: STRING,
      },
      publishedDate: {
        type: DATEONLY,
      },
      averageRating: {
        type: INTEGER,
      },
      ratingsCount: {
        type: INTEGER,
      },
      thumbnail: {
        type: STRING,
      },
      smallThumbnail: {
        type: STRING,
      },
      hasEpub: {
        type: BOOLEAN,
      },
      price: {
        type: FLOAT, // 11.99
      },
      currency: {
        type: STRING,
      },
    },
    { timestamps: false },
  );
};
