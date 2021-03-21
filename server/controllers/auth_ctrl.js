const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/users.js');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if email already exisits, throw error if true
    // else
    // encrypt the password
    // then create new user with info
    // then sign the access token using userID
    // send the access token

    req.send(newUser).status(201);
  } catch (err) {
    console.err(err);
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  // grab login info from body
  try {
    // check for user with email
    // validate password with bycript
    // if false, throw error
    // else sign the access token using User ID
    // send the access token
  } catch (err) {}
};

const logout = async (req, res) => {
  try {
    // delete the token client side upon logout
    // invalidate the token (check how)
  } catch (err) {}
};

module.exports = {
  register,
  login,
  logout,
};
