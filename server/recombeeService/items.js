//add items to catalog
const { client, rqs } = require('./recombeeConnection')

const addBook = async (book) => {
  try {
    const {
      id,
      author,
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
      currency} = book;
    const bookValues = {
      author,
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
      currency
    }
    await client.send(new rqs.AddItem(id, { cascadeCreate: true }, (err) => {
      if(err) throw Error;
    }));
    await client.send(new rqs.SetItemValues(id, bookValues, { cascadeCreate: false }, (err) => {
      if(err) throw Error;
    }));
    return 'Book added'
  } catch (err) {
    return err
  }
};

module.exports = addBook;
