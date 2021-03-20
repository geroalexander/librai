'use strict';

require('dotenv').config();
const config = process.env;
import { Sequelize } from 'sequelize';
import associations from './associations';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_DIALECT } = config;

// const seq = new Sequlize('DB_NAME', 'USERNAME', 'DB_PASSWORD', host...)
const seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
});

module.exports = seq;
