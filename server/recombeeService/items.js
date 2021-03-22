//add items to catalog
const { client, rqs } = require('./recombeeConnection');

const addApiBook = async (book) => {
  try {
    const {
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
    } = book.volumeInfo;
    const { thumbnail, smallThumbnail } = book.imageLinks;
    const { id } = book;
    const { amount, currencyCode } = book.saleInfo.retailPrice;
    const price = amount;
    const currency = currencyCode;
    const bookValues = {
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
    await client.send(
      new rqs.AddItem(id, { cascadeCreate: true }, (err) => {
        if (err) throw Error;
      }),
    );
    await client.send(
      new rqs.SetItemValues(id, bookValues, { cascadeCreate: false }, (err) => {
        if (err) throw Error;
      }),
    );
    return 'Book added';
  } catch (err) {
    return err;
  }
};

const addFormattedBook = async (book) => {
  try {
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
    } = book;
    const bookValues = {
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
    await client.send(
      new rqs.AddItem(id, { cascadeCreate: true }, (err) => {
        if (err) throw Error;
      }),
    );
    await client.send(
      new rqs.SetItemValues(id, bookValues, { cascadeCreate: false }, (err) => {
        if (err) throw Error;
      }),
    );
    return 'Book added';
  } catch (err) {
    return err;
  }
};

module.exports = { addApiBook, addFormattedBook };
