'use strict';
const { Router } = require('express');
const router = Router();
const userCTRL = require('../controllers/user_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// GET SAVED/READ BOOKS BY USER-ID
router.get('/user/saved', authMiddleware, userCTRL.getSavedBooks);
router.get('/user/read', authMiddleware, userCTRL.getReadBooks);

// ADD/EDIT SAVED/READ BOOK BY USER-ID
router.patch('/user/saved/:bookID', authMiddleware, userCTRL.updateSavedBook);
router.patch('/user/read/:bookID', authMiddleware, userCTRL.updateReadBook);

// DELETE SAVED/READ BOOKS BY USER-ID WITH BOOK-ID
router.delete('/user/saved/:bookID', authMiddleware, userCTRL.deleteSavedBook);
router.delete('/user/read/:bookID', authMiddleware, userCTRL.deleteReadBook);

module.exports = router;
