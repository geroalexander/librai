const jwt = require('jsonwebtoken');
const { models } = require('../../models');
const { user } = models;
const User = user;
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  console.log('auth! <-----');
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(token, SECRET_KEY);
    // attempt to find user object and set to req
    const user = await User.findOne({ where: { id: _id } });
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
