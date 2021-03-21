const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('../models/index');
const { user, book, interaction } = models;
const Book = book;
const User = user;
const Interaction = interaction;

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log('req.body', req.body);
    // check if email already exisits, throw error if true
    const user = await 

    // else
    // encrypt the password
    // then create new user with info
    // then sign the access token using userID
    // send the access token
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) res.status(401).send('This user already exisits');
    const createdUser = await user.create({
      firstName,
      lastName,
      email,
      password,
      favoriteGenres: [],
    });
    console.log(createdUser);
    res.send(createdUser).status(201);
  } catch (error) {
    console.error(error, 'Could not register, fn.register');
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  // grab login info from body
  try {
    // check for user with email
    // if user doesnt exist, throw error
    // else validate password with bycript
    // if false, throw error
    // else sign the access token using user ID
    // send the access token
  } catch (error) {}
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
  logout,
};
