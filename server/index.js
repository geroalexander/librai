'use strict';

import express from 'express';
const cors = require('cors');
const morgan = require('morgan');

import sequelize from './models/index';
const router = require('./routes/router.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

(async function () {
  try {
    app.listen(PORT, () => {
      console.log(`🤟 Server running at http://localhost:${PORT}`);
    });
    try {
      await sequelize.authenticate();
      await sequelize.sync(); // { force: true } use this to drop all data from table
      console.log('👊 Connection to db successful');
    } catch (error) {
      console.error('❌ Database connection unsuccessful:', error);
    }
  } catch (err) {
    console.log('❌ Server connection unsuccessful', err);
  }
})();
