'use strict';
const { Router } = require('express');
const router = Router();
const userCTRL = require('../controllers/user_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// GET DASHBOARD INFO
router.get('/user/dashboard', authMiddleware, userCTRL.loadDashboard);

// GET SAVED/READ BOOKS BY USER-ID
router.get('/user/profile', authMiddleware, userCTRL.getUserWithBooks);

// ADD/EDIT SAVED/READ BOOK BY USER-ID
router.patch('/user/saved/add', authMiddleware, userCTRL.addSavedBook);
router.patch('/user/rating/add', authMiddleware, userCTRL.updateRating);

// DELETE SAVED/READ BOOKS BY USER-ID WITH BOOK-ID
router.delete('/user/saved/:bookID', authMiddleware, userCTRL.deleteSavedBook);
router.delete('/user/rating/:bookID', authMiddleware, userCTRL.deleteRating);

module.exports = router;
