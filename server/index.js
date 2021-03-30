'use strict';
console.log(process.env.BANANA);
require('dotenv').config();
const LOCAL_HOST = process.env.LOCAL_HOST;
const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const sequelize = require('./models/index');
const router = require('./routes/router.js');

const app = express();

const corsConfig = {
  origin: LOCAL_HOST,
  credentials: true,
};
app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb', extended: true }));
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
