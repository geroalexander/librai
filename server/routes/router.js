'use strict';
const { Router } = require('express');
const router = Router();
const authCTRL = require('../controllers/auth_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// ROUTES
router.use('/user', require('./user_routes'));
router.use('/book', require('./book_routes'));

// USER REGISTER, LOGIN, LOGOUT
router.post('/register', authCTRL.register);
router.post('/login', authCTRL.login);
router.post('/logout', authMiddleware, authCTRL.logout);

module.exports = router;

// books / recommend saved read
