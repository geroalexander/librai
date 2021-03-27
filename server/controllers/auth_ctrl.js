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
  const { firstName, lastName, email, password, favoriteGenres } = req.body;

  try {
    if (!email || !password || !firstName || !lastName)
      throw new Error('EMPTY');
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('EXIST');
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
    console.error(error, 'Could not login, fn.login');
    if (error.message === 'EMPTY') res.status(400).send('Bad credentials');
    else if ((error.message = 'EXIST'))
      res.status(409).send('This user already exisits');
    else res.status(401).send('Unauthorised');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw Error('Invalid credentials');
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('NOT FOUND');
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) throw new Error('NOT FOUND');
    const accessToken = jwt.sign({ _id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error, 'Could not login, fn.login');
    res.status(400).send({ message: error.message });
    // if (error.message === 'EMPTY') res.status(400).send('Bad credentials');
    // else res.status(401).send('Unauthorised');
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
    res.status(200).send({ msg: 'Successful logout' });
  } catch (error) {}
};

module.exports = {
  register,
  login,
  form,
  logout,
};
