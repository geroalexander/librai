const { DataTypes } = require('sequelize');
const { INTEGER, BOOLEAN } = DataTypes;

module.exports = (sequelize) => {
  return sequelize.define(
    'rating',
    {
      hasRead: {
        type: BOOLEAN,
        default: false,
      },
      rating: {
        type: INTEGER,
        validate: {
          // This is a custom validator that checks rating is given if user has read book
          isRead() {
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
