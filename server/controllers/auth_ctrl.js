require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const config = process.env;
const { GOOGLE_CLIENT_ID } = config;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const SECRET_KEY = process.env.SECRET_KEY;
const { models } = require('../models/index');
const { user, book, interaction } = models;
const Book = book;
const User = user;
const Interaction = interaction;
const addUser = require('../recombeeService/user');

const register = async (req, res) => {
  const { firstName, lastName, email, password, favoriteGenres } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(409).send('This user already exisits');
  try {
    if (password === '') throw new Error('Password cannot be empty string!');
    const hash = await bcrypt.hash(password, 10);

    const { id } = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      favoriteGenres,
    });
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY);

    await addUser({
      first_name: firstName,
      last_name: lastName,
      userId: id,
      email: email,
    });
    res.status(201).send({ accessToken });
  } catch (error) {
    console.error(error, 'Could not register, fn.register');
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) res.status(404).send('No user found');
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) throw new Error();
    const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error, 'Could not login, fn.login');
    res.status(401).send(error);
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const { id } = existingUser;
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY);
    res.status(201).send({ accessType: 'login', accessToken });
  }
  try {
    firstName = name.split(' ')[0];
    lastName = name.split(' ').pop();
    console.log('lastName---->', lastName);

    const { id } = await User.create({
      firstName,
      lastName,
      email,
      profilePic: picture,
    });
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY);
    await addUser({
      first_name: firstName,
      last_name: lastName,
      userId: id,
      email: email,
    });
    res.status(201).send({ accessType: 'register', accessToken });
  } catch (error) {
    console.error(error, 'Could not register, fn.googleLogin');
    res.status(400).send(error);
  }
};

const form = async (req, res) => {
  const user = req.user;
  // const { info } = req.body;
  // const { favoriteGenres, }
  try {
    const { favoriteGenres, pastBooks } = req.body;
    const userFromDB = await User.findOne({
      where: { id: user.id },
    });
  } catch (error) {
    console.error(error, 'Could not complete form. fn.form');
    res.status(400).send(error);
  }
};

const logout = async (req, res) => {
  try {
    // delete the token client side upon logout
    // invalidate the token (check how)
    res.sendStatus(200);
  } catch (error) {}
};

module.exports = {
  register,
  login,
  form,
  logout,
  googleLogin,
};
