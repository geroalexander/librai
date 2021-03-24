const { Router } = require('express');
const router = Router();
const authCTRL = require('../controllers/auth_ctrl');
const authMiddleware = require('./auth/authMiddleware');

router.post('/register', authCTRL.register);
router.post('/login', authCTRL.login);
router.patch('/form', authMiddleware, authCTRL.form);
router.post('/logout', authMiddleware, authCTRL.logout);

module.exports = router;
