const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/users.js');

const getSavedBooks = async (req, res) => {
  // get user info from req.user

  try {
    // find user info by ID
    //
  } catch (err) {
    console.err(err);
    res.status(400);
    res.send(err);
  }
};

const getReadBooks = async (req, res) => {
  try {
    // deconstruct params|body
    // some logic
  } catch (err) {
    console.err(err);
    res.status(400);
    res.send(err);
  }
};

const updateSavedBook = async (req, res) => {
  try {
    // deconstruct params|body
    // some logic
  } catch (err) {
    console.err(err);
    res.status(400);
    res.send(err);
  }
};

const updateReadBook = async (req, res) => {
  try {
    // deconstruct params|body
    // some logic
  } catch (err) {
    console.err(err);
    res.status(400);
    res.send(err);
  }
};

const deleteSavedBook = async (req, res) => {
  try {
    // deconstruct params|body
    // some logic
  } catch (err) {
    console.err(err);
    res.status(400);
    res.send(err);
  }
};

const deleteReadBook = async (req, res) => {
  try {
    // deconstruct params|body
    // some logic
  } catch (err) {
    console.err(err);
    res.status(400);
    res.send(err);
  }
};

module.exports = {
  getSavedBooks,
  getReadBooks,
  updateSavedBook,
  updateReadBook,
  deleteSavedBook,
  deleteReadBook,
};
