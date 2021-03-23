const formatBook = (book) => {
  const {
    authors = [],
    title,
    subtitle = null,
    description = null,
    pageCount = null,
    categories = [],
    publisher = null,
    publishedDate,
    averageRating = null,
    ratingsCount = null,
  } = book.volumeInfo;

  let thumbnail,
    smallThumbnail = null;
  if (book.volumeInfo.imageLinks) {
    thumbnail = book.volumeInfo.imageLinks.thumbnail;
    smallThumbnail = book.volumeInfo.imageLinks.smallThumbnail;
  }

  const { id } = book;

  let price,
    currency = null;
  if (book.saleInfo.retailPrice) {
    price = book.saleInfo.retailPrice.amount;
    currency = book.saleInfo.retailPrice.currencyCode;
  }

  const formattedBook = {
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

  return formattedBook;
};

module.exports = { formatBook };
