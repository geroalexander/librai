const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('../models/index');
const { user, book, interaction } = models;
const Book = book;
const User = user;
const Interaction = interaction;

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log('req.body', req.body);

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
      favoriteGenres: [],
    });
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY);
    // send user to recombee -
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

// const form = async (req, res) => {
//   const { info } = req.body;
//   const { favoriteGenres, }
//   try {

//   } catch (error) {
//     console.error(error, 'Could not complete form. fn.form');
//     res.status(400).send(error);
//   }
// };

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
