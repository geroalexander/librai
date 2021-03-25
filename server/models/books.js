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
      authors: {
        type: ARRAY(STRING),
        default: [],
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
        default: [],
      },
      publisher: {
        type: STRING,
      },
      publishedDate: {
        type: STRING,
      },
      averageRating: {
        type: FLOAT,
      },
      ratingsCount: {
        type: INTEGER,
      },
      thumbnail: {
        type: TEXT,
      },
      smallThumbnail: {
        type: TEXT,
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
