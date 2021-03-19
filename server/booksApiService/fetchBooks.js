require('dotenv').config({ path: '../.env' });
const fetch = require('node-fetch');
const config = process.env;

const { GOOGLE_BOOKS_API_KEY } = config;

const fetchBooks = (searchQuery) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${GOOGLE_BOOKS_API_KEY}`,
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.items && json.items.length) {
        return json.items.length > 3 ? json.items.slice(0, 3) : json.items[0];
      }
    });
};

module.exports = { fetchBooks };
