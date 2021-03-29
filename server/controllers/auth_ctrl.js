const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const { models } = require('../models/index');
const { user } = models;
const User = user;
const addUser = require('../recombeeService/user');
const { handleErrors } = require('./errorHandling');

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

    const recombeeRequest = await addUser({
      first_name: firstName,
      last_name: lastName,
      userId: id,
      email: email,
    });
    if (recombeeRequest !== 'User added')
    throw new Error('Recommendation engine error');
    res.status(201).send({ accessToken });
  } catch (error) {
    console.error(error);
    handleErrors(error, res);
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
    console.error(error);
    handleErrors(error, res);
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).send({ message: 'Successful logout' });
  } catch (error) {
    res.status(400).send({ message: 'Logout unsuccessful' });
  }
};


module.exports = {
  register,
  login,
  logout,
};
