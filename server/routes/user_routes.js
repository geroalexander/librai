'use strict';
const { Router } = require('express');
const router = Router();
const userCTRL = require('../controllers/user_ctrl');

// CREATE NEW USER
router.post('/user/create', userCTRL.createNewUser);

// GET SAVED/READ BOOKS BY USER-ID
router.get('/user/:userID/saved', userCTRL.getSavedBooks);
router.get('/user/:userID/read', userCTRL.getReadBooks);

// ADD/EDIT SAVED/READ BOOK BY USER-ID
router.patch('/user/:userID/saved/:bookID', userCTRL.updateSavedBook);
router.patch('/user/:userID/read/:bookID', userCTRL.updateReadBook);

// DELETE SAVED/READ BOOKS BY USER-ID WITH BOOK-ID
router.delete('/user/:userID/saved/:bookID', userCTRL.deleteSavedBook);
router.delete('/user/:userID/read/:bookID', userCTRL.deleteReadBook);

module.exports = router;
