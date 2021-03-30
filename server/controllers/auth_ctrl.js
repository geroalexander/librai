require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const config = process.env;
const { GOOGLE_CLIENT_ID } = config;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
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
    if (existingUser) throw new Error('This user already exists');
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
    const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY, {
      expiresIn: '7d',
    });
    res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error);
    handleErrors(error, res);
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;
  console.log(token, 'TOKEN');
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const { id } = existingUser;
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY, { expiresIn: '7d' });
    res.status(201).send({ accessType: 'login', accessToken });
    return;
  }
  try {
    firstName = name.split(' ')[0];
    lastName = name.split(' ').pop();
    const { id } = await User.create({
      firstName,
      lastName,
      email,
      profilePic: picture,
    });
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY, { expiresIn: '7d' });
    await addUser({
      first_name: firstName,
      last_name: lastName,
      userId: id,
      email: email,
    });
    res.status(201).send({ accessType: 'register', accessToken });
  } catch (error) {
    console.error(error, 'Could not register, fn.googleLogin');
    res.status(400).send({ message: error.message });
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
  googleLogin,
};
