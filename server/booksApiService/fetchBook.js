require('dotenv').config();
const fetch = require('node-fetch');
const config = process.env;
const { GOOGLE_BOOKS_API_KEY } = config;

const fetchBook = (searchQuery) => {
  // searchQuery => 'no+country+for+old+mean'
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${GOOGLE_BOOKS_API_KEY}`,
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.items && json.items.length) {
        return json.items[0];
      } else return Promise.reject('Books not retrieved')
    })
};

module.exports = { fetchBook };
