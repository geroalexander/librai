'use strict';

require('dotenv').config();
const config = process.env;
const { Sequelize } = require('sequelize');
const associations = require('./associations');
const { DATABASE_URL } = config;
// const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_DIALECT } = config;

const sequelize = new Sequelize(DATABASE_URL, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const modelDefiners = [
  require('./users'),
  require('./books'),
  require('./interaction'),
];

// Define all models according to their files.
modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

// Execute all associations after the models are defined
// ... this stops circular dependencies
associations(sequelize);

module.exports = sequelize;
