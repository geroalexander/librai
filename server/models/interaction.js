const { DataTypes } = require('sequelize');
const { INTEGER, BOOLEAN } = DataTypes;

module.exports = (sequelize) => {
  return sequelize.define(
    'interaction',
    {
      isSaved: {
        type: BOOLEAN,
        default: false,
      },
      rating: {
        type: INTEGER,
        default: null,
        validate: {
          // This is a custom validator that checks rating is given if user has read book
          ifUserHasReadNeedRating() {
            if (this.hasRead && this.rating === undefined) {
              throw new Error('Please rate this book if you have read it.');
            }
          },
        },
      },
    },
    { timestamps: false }, // Do we need these?
  );
};
