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
      },
      compatabilityScore: {
        type: INTEGER,
        default: null,
      },
    },
    { timestamps: false }, // Do we need these?
  );
};
