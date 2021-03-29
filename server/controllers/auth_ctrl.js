const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const { models } = require('../models/index');
const { user } = models;
const User = user;
const addUser = require('../recombeeService/user');

const register = async (req, res) => {
  const { firstName, lastName, email, password, favoriteGenres } = req.body;

  try {
    if (!email || !password || !firstName || !lastName)
      throw new Error('Missing credentials');
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('This user already exisits');
    const hash = await bcrypt.hash(password, 10);
    const { id } = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      favoriteGenres,
    });
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY, { expiresIn: '7d' });

    await addUser({
      first_name: firstName,
      last_name: lastName,
      userId: id,
      email: email,
    });
    res.status(201).send({ accessToken });
  } catch (error) {
    handleCtrlError(error, res)
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw Error('Missing credentials');
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Bad credentials');
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) throw new Error('Bad credentials');
    const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY, { expiresIn: '7d' });
    res.status(200).send({ accessToken });
  } catch (error) {
    handleCtrlError(error, res);
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).send({ message: 'Successful logout' });
  } catch (error) {
    res.status(400).send({ message: 'Logout unsuccessful' });
  }
};

const handleCtrlError = (error, res) => {
  const { message } = error;
  switch (message) {
    case 'Missing credentials':
      res.status(400).send({ message });
      break;
    case 'Bad credentials':
      res.status(401).send({ message });
      break;
    case 'This user already exisits':
      res.status(409).send({ message });
      break;
    default:
      res.status(500).send({ message });
  }
};

module.exports = {
  register,
  login,
  logout,
};
