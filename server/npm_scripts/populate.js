// populate.js
// populates PSQL DB it with: 1 user who has 10 saved, 10 rated books
// MAKE SURE EXPRESS SERVER AND DB ARE RUNNING
// execute: npm run populate

const { models } = require('../models/');
const { user, interaction, book } = models;
const Book = book;
const bookRating = require('../recombeeService/rate');
const bookmark = require('../recombeeService/bookmark');
const bcrypt = require('bcrypt');
const books = require('./populate_books.json');
const mockUser = {
  firstName: 'Vladimir',
  lastName: 'Putin',
  email: 'vlad_putin@hollywood.com',
  password: 'password',
  favoriteGenres: [
    'Music',
    'Performing Arts',
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

  // Populate DB with 10 saved books for mock user
  console.log('Mocking user saved books...');
  for (let i = 0; i < 10; i++) await mockAddSavedBook(books[i]);

  // Populate DB with 10 rated books for mock user
  console.log('Mocking user read books...');
  for (let j = 10; j < 20; j++) await mockAddRatedBook(books[j]);
  console.log('🤙 Database populated: 1 user, 10 saved & 10 read interactions');
};

mainScript().then((res) => console.log('res---->', res));

/*
----------------
HELPER FUNCTIONS
---------------- 
*/

async function registerMockUser() {
  console.log('register HEREEE---->');

  try {
    const existingUser = await user.findOne({
      where: { email: mockUser.email },
    });
    if (existingUser) throw new Error('Matt Damon already exists');

    mockUserCreated = await user.create(mockUser);
    console.log('mockUserCreated SECOND---->', mockUserCreated);

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
