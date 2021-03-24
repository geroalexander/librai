// populate.js
// populates PSQL DB it with: 1 user who has 10 saved, 10 rated books
// MAKE SURE EXPRESS SERVER AND DB ARE RUNNING
// execute: npm run populate
// const

// to get access token
const jwt = require('jsonwebtoken');
require('dotenv').config();
const addUser = require('../recombeeService/user');
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');

const { models } = require('../models/');
const { user, interaction, book } = models;
const Book = book;
const bookRating = require('../recombeeService/rate');
const bookmark = require('../recombeeService/bookmark');
const books = require('./populate_books.json');

const mockUser = {
  firstName: 'Pamela',
  lastName: 'Chen',
  email: 'pams@hollywood.com',
  password: 'password',
  favoriteGenres: [
    'Science Fiction',
    'Fantasy',
    'Health & Fitness',
    'Drama',
    'Gardening',
  ],
  profilePic:
    'https://upload.wikimedia.org/wikipedia/commons/8/82/Damon_cropped.jpg',
};
let mockUserCreated;

/*
-----------
MAIN SCRIPT
-----------
*/
const mainScript = async () => {
  // Register mock user
  console.log('Beginning to populate');
  await registerMockUser();
  console.log('mockUserCreated---->', mockUserCreated);
  const { id } = mockUserCreated;
  console.log('SECRET KEY ---------', SECRET_KEY);
  console.log('id ---------', id);
  const accessToken = jwt.sign({ _id: id }, SECRET_KEY);
  console.log('------------------ACCESS TOKEN HERE---------------------');
  console.log(accessToken);
  console.log('------------------ACCESS TOKEN HERE---------------------');
  // Populate DB with 10 saved books for mock user
  console.log('Mocking user saved books...');
  for (let i = 0; i < 10; i++) await mockAddSavedBook(books[i]);

  // Populate DB with 10 rated books for mock user
  console.log('Mocking user read books...');
  for (let j = 10; j < 20; j++) await mockAddRatedBook(books[j]);
  console.log('🤙 Database populated: 1 user, 10 saved & 10 read interactions');
};

mainScript();

/*
----------------
HELPER FUNCTIONS
---------------- 
*/

async function registerMockUser() {
  try {
    const existingUser = await user.findOne({
      where: { email: mockUser.email },
    });
    if (existingUser) throw new Error('Matt Damon already exists');

    const password = 'password';
    const hash = await bcrypt.hash(password, 10);
    mockUser.password = hash;
    mockUserCreated = await user.create(mockUser);

    const { firstName, lastName, id, email } = mockUserCreated;

    await addUser({
      first_name: firstName,
      last_name: lastName,
      userId: id,
      email: email,
    });

    if (!mockUserCreated) throw new Error('Matt damon could not be created');
  } catch (error) {
    console.error(error);
  }
}

async function mockAddSavedBook(book) {
  const {
    id,
    authors,
    title,
    subtitle,
    description,
    pageCount,
    categories,
    publisher,
    publishedDate,
    averageRating,
    ratingsCount,
    thumbnail,
    smallThumbnail,
    price,
    currency,
    compatabilityScore,
  } = book;
  const bookValues = {
    id,
    authors,
    title,
    subtitle,
    description,
    pageCount,
    categories,
    publisher,
    publishedDate,
    averageRating,
    ratingsCount,
    thumbnail,
    smallThumbnail,
    price,
    currency,
  };
  try {
    let targetBook = await Book.findByPk(bookValues.id);
    if (!targetBook) targetBook = await Book.create(bookValues);

    await mockUserCreated.addBook(targetBook, {
      through: { isSaved: true, compatabilityScore },
    });
    await bookmark(mockUserCreated.id, book);
  } catch (error) {
    console.error(error);
  }
}

// Function that returns -1, 0, or 1 depending on math random
function randomiseRating() {
  let random = Math.random();
  let rating;

  if (random < 0.33) rating = -1;
  else if (random < 0.66) rating = 0;
  else rating = 1;

  return rating;
}

async function mockAddRatedBook(book) {
  const {
    id,
    authors,
    title,
    subtitle,
    description,
    pageCount,
    categories,
    publisher,
    publishedDate,
    averageRating,
    ratingsCount,
    thumbnail,
    smallThumbnail,
    price,
    currency,
    compatabilityScore,
  } = book;
  const bookValues = {
    id,
    authors,
    title,
    subtitle,
    description,
    pageCount,
    categories,
    publisher,
    publishedDate,
    averageRating,
    ratingsCount,
    thumbnail,
    smallThumbnail,
    price,
    currency,
  };
  const rating = randomiseRating();
  try {
    let targetBook = await Book.findByPk(bookValues.id);
    if (!targetBook) targetBook = await Book.create(bookValues);

    const targetInteraction = await interaction.findOne({
      where: { userId: mockUserCreated.id, bookId: bookValues.id },
    });
    if (targetInteraction) {
      await targetInteraction.update({ rating });
      return;
    }

    await mockUserCreated.addBook(targetBook, {
      through: { rating, compatabilityScore },
    });
    await bookRating(mockUserCreated.id, book, rating);
  } catch (error) {
    console.error(error);
  }
}
