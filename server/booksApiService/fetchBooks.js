require('dotenv').config({
  path: '/Users/pamelachen/Desktop/librai/librai/server/.env',
});
const fetch = require('node-fetch');
const config = process.env;
const { GOOGLE_BOOKS_API_KEY } = config;

const fetchBook = (searchQuery) => {
  console.log(searchQuery);
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${GOOGLE_BOOKS_API_KEY}`,
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.items && json.items.length) {
        return json.items[0];
      }
      console.log('Books not retrieved! fetchBooks');
    })
    .catch((e) => console.log(e));
};

module.exports = { fetchBook };
