// populate.js
// populates PSQL DB it with: 1 user who has 10 saved, 10 rated books
// MAKE SURE EXPRESS SERVER AND DB ARE RUNNING
// execute: npm run populate

const { models } = require('../models/');
const { user, interaction } = models;
const bcrypt = require('bcrypt');
const books = require('./populate_books.json');
const mockUser = {
  firstName: 'Matt',
  lastName: 'Damon',
  email: 'matt_damon@hollywood.com',
  password: bcrypt.hash('password', 10),
  favoriteGenres: ['Music', 'Performing Arts', 'Health & Fitness', 'Drama', 'Gardening'],
  profilePic: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Damon_cropped.jpg'
};
let mockUserCreated;

/*
-----------
MAIN SCRIPT
-----------
*/


// Register mock user
console.log('Beginning to populate');
registerMockUser();

// Populate DB with 10 saved books for mock user
console.log('Mocking user saved books...');
for (let i = 0; i < 10; i++) mockAddSavedBook(books[i]);

// Populate DB with 10 rated books for mock user
console.log('Mocking user read books...');
for (let j = 10; j < 20; j++) mockAddRatedBook(books[j]);
console.log('🤙 Database populated: 1 user, 10 saved & 10 read interactions');

/*
----------------
HELPER FUNCTIONS
---------------- 
*/

function registerMockUser() {
  try {
    console.log('Attempting to insert user...');

    const existingUser = await user.findOne({ where: { email: mockUser.email } });
    if (existingUser) throw new Error('Matt Damon already exists');

    mockUserCreated = await user.create(mockUser);
    if (!mockUserCreated) throw new Error('Matt damon could not be created');

    console.log('User inserted successfully');
  } catch (error) {
    console.error(error);
  }
};

function mockAddSavedBook (book) {
  try {
    let targetBook = await book.findByPk(book.id);
    if (!targetBook) targetBook = await book.create(book);
    await mockUserCreated.addBook(targetBook, { through: { isSaved: true }});
    // TODO: call recombee bookmark function
  } catch (error) {
    console.error(error);
  }
};

// Function that returns -1, 0, or 1 depending on math random
function randomiseRating () {
  let random = Math.random();
  let rating;

  if (random < 0.33) rating = -1;
  else if(random < 0.66) rating = 0;
  else rating = 1;

  return rating;
};

function mockAddRatedBook (book) {
  const rating = randomiseRating();
  try {
    let targetBook = await book.findByPk(book.id);
    if (!targetBook) targetBook = await book.create(book);

    const targetInteraction = await interaction.findOne({
      where: {userId: mockUserCreated.id, bookId: book.id},
    });
    if (targetInteraction) {
      await targetInteraction.update({ rating });
      return
    };
    await mockUserCreated.addBook(book, { through: { rating }});
    // TODO: call recombee add rating 
  } catch (error) {
    console.error(error);
  }
};

