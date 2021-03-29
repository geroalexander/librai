const jwt = require('jsonwebtoken');
const { models } = require('../../models');
const { user } = models;
const User = user;
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.status(401).send({ message: 'Unauthorized' });
  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ where: { id: _id } });

    if (!user) return res.status(403).send({ message: 'Forbidden' });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong' });
  }
};

module.exports = authMiddleware;
