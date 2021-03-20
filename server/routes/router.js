'use strict';
const router = express.Router();
const userRoute = require('./user_routes.js');
const bookRoute = require('./api.js');

// ROUTES
router.use('/user/*', userRoute);
router.use('/book/*', bookRoute);

module.exports = router;

// books / recommend saved read
