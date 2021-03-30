'use strict';

require('dotenv').config({ path: __dirname + '/../../.env' });
const config = process.env;
const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_DIALECT } = config;
const { Sequelize } = require('sequelize');
const associations = require('./associations');
const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  ssl: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: process.env.DATABASE_URL && {
      require: true,
      rejectUnauthorized: false,
    },
  },
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
