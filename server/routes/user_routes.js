'use strict';
const { Router } = require('express');
const router = Router();
const userCTRL = require('../controllers/user_ctrl');
const authMiddleware = require('./auth/authMiddleware');

// GET DASHBOARD INFO
router.get('/dashboard', authMiddleware, userCTRL.loadDashboard);

// COMPLETE FORM OR UPDATE USER
router.post('/form', authMiddleware, userCTRL.registrationForm);
router.post('/update', authMiddleware, userCTRL.updateProfile);

// GET SAVED/READ BOOKS BY USER-ID
router.get('/profile', authMiddleware, userCTRL.getUserWithBooks);

// ADD/EDIT SAVED/READ BOOK BY USER-ID
router.patch('/saved', authMiddleware, userCTRL.addSavedBook);
router.patch('/rating', authMiddleware, userCTRL.updateRating);

// DELETE SAVED/READ BOOKS BY USER-ID WITH BOOK-ID
router.delete('/saved', authMiddleware, userCTRL.deleteSavedBook);
router.delete('/rating', authMiddleware, userCTRL.deleteRating);

module.exports = router;
