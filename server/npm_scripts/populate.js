// populate.js
// populates PSQL DB it with: 1 user who has 10 saved, 10 rated books
// execute: npm run populate

const { models } = require('../models/');
const { user, book, interaction } = models;
const bcrypt = require('bcrypt');

const mockUser = {
  firstName: 'Matt',
  lastName: 'Damon',
  email: 'matt_damon@hollywood.com',
  password: bcrypt.hash('password', 10),
  favoriteGenres: ['Music', 'Performing Arts', 'Health & Fitness', 'Drama', 'Gardening'],
  profilePic: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Damon_cropped.jpg'
};

const registerMockUser = () => {
  try {
    const existingUser = await user.findOne({ where: { email: mockUser.email } });
    if (existingUser) throw new Error('Matt Damon already exists');

    const mockUserWasCreated = await user.create(mockUser);
    if (!mockUserWasCreated) throw new Error('Matt damon could not be created');
  } catch (error) {
    console.error(error);
  }
};

registerMockUser();

