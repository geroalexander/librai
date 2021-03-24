const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const { models } = require('../models/index');
const { user, book, interaction } = models;
const Book = book;
const User = user;
const Interaction = interaction;
const addUser = require('../recombeeService/user');

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    favoriteGenres = null,
  } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(409).send('This user already exisits');
  if (password === '') return res.status(409).send('Password cannot be empty');
  try {
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
  const hash = await bcrypt.hash(password, 10);
  console.log('hash---->', hash);
  try {
    const user = await User.findOne({ where: { email } });
    console.log('user---->', user);

    if (!user) res.status(404).send('No user found');
    const validatePassword = await bcrypt.compare(password, user.password);
    console.log('validatePassword---->', typeof validatePassword);
    console.log('password---->', password);
    console.log('user.password---->', typeof user.password);

    if (!validatePassword) throw new Error();
    const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error, 'Could not login, fn.login');
    res.status(401).send(error);
  }
};

const form = async (req, res) => {
  // const { info } = req.body;
  // const { favoriteGenres, }
  try {
  } catch (error) {
    console.error(error, 'Could not complete form. fn.form');
    res.status(400).send(error);
  }
};

const logout = async (req, res) => {
  try {
    // delete the token client side upon logout
    // invalidate the token (check how)
  } catch (error) {}
};

module.exports = {
  register,
  login,
  form,
  logout,
};
