'use strict';
const { Router } = require('express');
const router = Router();
const bookCTRL = require('../controllers/book_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// GET RECOMENDATION BY USER-ID
router.get('/recommend', authMiddleware, bookCTRL.getRecommendedBooks);

// GET BOOK BY COVER/SEARCH (info sent as body)
router.post('/cover', authMiddleware, bookCTRL.getBookByCover);
router.post('/search', authMiddleware, bookCTRL.getBookBySearch);

// GET BOOK DETAILS
router.get('/details/:bookId', bookCTRL.getBookDetails);

module.exports = router;
