const { DataTypes } = require('sequelize');
const { STRING, INTEGER, FLOAT, TEXT, ARRAY, DATEONLY, BOOLEAN } = DataTypes;

module.exports = (sequelize) => {
  return sequelize.define(
    'book',
    {
      id: {
        type: DataTypes.STRING, // <-- Google books api id
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      author: {
        type: STRING,
        allowNull: false,
      },
      title: {
        type: STRING,
        allowNull: false,
      },
      subtitle: {
        type: STRING,
        allowNull: false,
      },
      description: {
        type: TEXT('long'), // Need to work out the difference between tiny, medium and long options
        allowNull: false,
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
        type: DATEONLY, // OR STRING ?
      },
      averageRating: {
        type: INTEGER,
        allowNull: false, // DO WE NEED ALLOW-NULL? Will a zero value be null in return from API
      },
      ratingsCount: {
        type: INTEGER,
      },
      imageLink: {
        type: STRING,
      },
      hasEpub: {
        type: BOOLEAN,
        // default: true // DO WE NEED TO SET A DEFAULT VALUE
      },
      price: {
        type: FLOAT, // 11.99
      },
      currencyCode: {
        type: STRING, // NEED TO UPDATE BACK END GOOGLE DOC WITH THIS PROP
      },
    },
    { timestamps: false },
  );
};
