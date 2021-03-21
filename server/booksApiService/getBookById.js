require('dotenv').config({
  path: '/Users/pamelachen/Desktop/librai/librai/server/.env',
});
const fetch = require('node-fetch');
const config = process.env;
const { GOOGLE_BOOKS_API_KEY } = config;

const getBookById = (bookId) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`,
  )
    .then((res) => res.json())
    .then((json) => {
      if (json) return json;
      console.log('Book not retrieved! getBookById');
    })
    .catch((e) => console.log(e));
};

// getBookById('Eo-uAwAAQBAJ');
