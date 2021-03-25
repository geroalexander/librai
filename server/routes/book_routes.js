'use strict';
const { Router } = require('express');
const router = Router();
const bookCTRL = require('../controllers/book_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// GET RECOMENDATION BY USER-ID
router.get('/recommend', authMiddleware, bookCTRL.getRecommendedBooks);

// GET BOOK BY COVER/SEARCH (info sent as body)
router.post('/cover', authMiddleware, bookCTRL.getBookByCover);
router.post('/score', authMiddleware, bookCTRL.getBookWithScore);

// GET BOOK DETAILS
// change auth
router.post('/details', authMiddleware, bookCTRL.viewBookDetails);

module.exports = router;
