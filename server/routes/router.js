'use strict';
const { Router } = require('express');
const router = Router();

// ROUTES
router.use('/user/*', require('./user_routes'));
router.use('/book/*', require('./book_routes'));

module.exports = router;

// books / recommend saved read
