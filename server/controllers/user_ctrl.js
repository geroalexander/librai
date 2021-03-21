const { user } = require('../models/users.js');

const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newUser = await user.create(firstName, lastName);

    req.send(newUser).status(201);
  } catch (err) {
    console.err(err);
    res.status(400).send(err);
  }
};

const getSavedBooks = async (req, res) => {
  try {
    // deconstruct params|body
    // some logic
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
  createNewUser,
  getSavedBooks,
  getReadBooks,
  updateSavedBook,
  updateReadBook,
  deleteSavedBook,
  deleteReadBook,
};
