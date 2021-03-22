'use strict';
const { Router } = require('express');
const router = Router();
const userCTRL = require('../controllers/user_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// GET DASHBOARD INFO
router.get('/dashboard', userCTRL.loadDashboard);

// GET SAVED/READ BOOKS BY USER-ID
router.get('/profile', userCTRL.getUserWithBooks);

// ADD/EDIT SAVED/READ BOOK BY USER-ID
router.patch('/saved', authMiddleware, userCTRL.addSavedBook);
router.patch('/rating', authMiddleware, userCTRL.updateRating);

// DELETE SAVED/READ BOOKS BY USER-ID WITH BOOK-ID
router.delete('/saved', userCTRL.deleteSavedBook);
router.delete('/rating', userCTRL.deleteRating);

module.exports = router;
