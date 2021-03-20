'use strict';

import express from 'express';
const cors = require('cors');
const morgan = require('morgan');

import sequelize from './models/index';
const router = require('./router');

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
      await sequelize.sync();
      console.log('👊 Connection to db successful');
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
    }
  } catch (err) {
    console.log(err);
  }
})();
