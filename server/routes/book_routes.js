'use strict';
const router = express.Router();
const bookCTRL = require('../controllers/book_ctrl.js');

// GET RECOMENDATION BY USER-ID
router.get('/book/:userID/recommend', bookCTRL);

// ADD RATING IN RECOMBEE
router.patch('/book/:userID/:bookID', bookCTRL);

// GET BOOK BY COVER/SEARCH (info sent as body)
router.get('/book/cover', bookCTRL);
router.get('/book/search', bookCTRL);

// GET BOOK DETAILS
router.get('/book/details/:bookID', bookCTRL); ///***

module.exports = bookRoutes;
