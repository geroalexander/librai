'use strict';
const { Router } = require('express');
const router = Router();
const bookCTRL = require('../controllers/book_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// GET RECOMENDATION BY USER-ID
router.get('/recommend', bookCTRL);

// ADD RATING IN RECOMBEE
router.patch('/rating', bookCTRL);

// GET BOOK BY COVER/SEARCH (info sent as body)
router.get('/cover', bookCTRL);
router.get('/search', bookCTRL);

// GET BOOK DETAILS
router.get('/details/:bookID', bookCTRL); ///***

module.exports = router;
