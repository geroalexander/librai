const { fetchBooks } = require('./booksApiService/fetchBooks');
const fs = require('fs');

const rawBooks = require('../10kBooks.json');
// const recombeeBooks = require('./recombeeBooks.json');

const booksArray = [];

const fetchBooksFromApi = () => {
  console.log(rawBooks[9001].original_title);
  for (let i = 0; i < 1001; i++) {
    if (!rawBooks[i + 9001]) return;
    const oTitle = rawBooks[i + 9001].original_title;

    let wordArray;
    if (oTitle && oTitle.length) wordArray = oTitle.toLowerCase().split(' ');

    let formattedArray;
    if (wordArray && wordArray.length)
      formattedArray = wordArray.map((w) => w.replace(/[^A-Za-z']/g, ''));

    if (formattedArray) {
      formattedArray = formattedArray.filter(
        (w) => w !== undefined && w.length,
      );
      const searchQuery = formattedArray.join('+');

      setTimeout(() => {
        fetchBooks(searchQuery)
          .then((res) => {
            const {
              title = null,
              subtitle = null,
              authors = [],
              publisher = null,
              publishedDate = null,
              description = null,
              pageCount = null,
              categories = [],
              averageRating = null,
              ratingsCount = null,
            } = res.volumeInfo;

            const {
              smallThumbnail = null,
              thumbnail = null,
            } = res.volumeInfo.imageLinks;

            let price = null;
            let currency = null;
            if (res.saleInfo.retailPrice) {
              price = res.saleInfo.retailPrice.amount;
              currency = res.saleInfo.retailPrice.currencyCode;
            }

            const bookObj = {
              id: res.id,
              title,
              subtitle,
              authors,
              publisher,
              publishedDate,
              description,
              pageCount,
              categories,
              averageRating,
              ratingsCount,
              smallThumbnail,
              thumbnail,
              price,
              currency,
            };

            booksArray.push(bookObj);
            if (i > 997) {
              let stringified = JSON.stringify(booksArray, null, 2);
              fs.writeFileSync('9001-10000.json', stringified);
            }
          })
          .catch((e) => console.log(e));
      }, 1000 * i);
    }
  }
};

fetchBooksFromApi();

// loop over rawbooks
//// format text to be search query
//// try fetchbooks with original title
//// if nothing comes back, try with title
//// push data to booksArray

// finally:
// write booksArray to recombeeBooks.json
