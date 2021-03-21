'use strict';
const { Router } = require('express');
const router = Router();
const authMiddleware = require('./auth/authMiddleware'); // not sure if needed

router.use('/user', require('./user_routes'));
router.use('/book', require('./book_routes'));
router.use('/auth', require('./auth_routes'));

module.exports = router;

// books / recommend saved read
