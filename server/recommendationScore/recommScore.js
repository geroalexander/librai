//given a book and a user
const { getBookById } = require('../booksApiService/getBookById');
const getRecommendations = require('../recombeeService/getRecommendations');

const getCompatScore = async (user, book) => {
  let skip = false;

  let similarityWithRecomms = 0;
  const recommBooks = await getRecommendations(user.id, 4);

  for (const rec of recommBooks.recomms) {
    const retrievedBook = await getBookById(rec.id);
    if (retrievedBook) {
      if (retrievedBook.id === book.id) return 10;
      let similarityScore = 0;
      if (retrievedBook.volumeInfo.categories) {
        console.log('book---->', book);
        const sameGenre = retrievedBook.volumeInfo.categories.some((c) =>
          book.categories.includes(c),
        );
        if (sameGenre) similarityScore++;
      }
      const sameAuthor = retrievedBook.volumeInfo.authors.some((a) =>
        book.authors.includes(a),
      );
      if (sameAuthor) similarityScore++;
      if (
        book.pageCount >= retrievedBook.volumeInfo.pageCount - 100 &&
        book.pageCount <= retrievedBook.volumeInfo.pageCount + 100
      )
        similarityScore++;
      if (book.publisher === retrievedBook.volumeInfo.publisher)
        similarityScore++;
      if (similarityScore > 1) similarityWithRecomms++;
    }
  }

  // check the average rating;
  let hasGoodRating = 0;
  if (book.averageRating > 4) hasGoodRating += book.averageRating - 4;

  // compare it with favorite genres list
  let isFavoriteGenre = 0;
  const inFavoriteGenres = user.favoriteGenres.some((g) =>
    book.categories.includes(g),
  );
  if (inFavoriteGenres) isFavoriteGenre++;

  // compare it with past ratings
  let isSimilarToRatings = 0;
  const ratedBooks = user.books.filter((b) => b.interaction.rating === 1);
  const numOfRated = ratedBooks.length;

  ratedBooks.forEach((rated) => {
    console.log('rated---->', rated);

    let similarityScore = 0;
    const sameGenre = rated.categories.some((c) => book.categories.includes(c));
    if (sameGenre) similarityScore++;
    const sameAuthor = rated.authors.some((a) => book.authors.includes(a));
    if (sameAuthor) similarityScore++;
    if (
      book.pageCount >= rated.pageCount - 100 &&
      book.pageCount <= rated.pageCount + 100
    )
      similarityScore++;
    if (book.publisher === rated.publisher) similarityScore++;
    if (similarityScore > 1) isSimilarToRatings++;
  });

  console.log('numOfRated---->', numOfRated);
  console.log('isSimilarToRatings---->', isSimilarToRatings);
  let similarityWithPast = 0;
  if (isSimilarToRatings !== 0)
    similarityWithPast = Math.round((isSimilarToRatings / numOfRated) * 4);

  console.log('hasGoodRating---->', hasGoodRating);
  console.log('isFavoriteGenre---->', isFavoriteGenre);
  console.log('similaryWithPast---->', similarityWithPast);
  console.log('similarityWithRecomms---->', similarityWithRecomms);

  const compatabilityScore =
    hasGoodRating +
    isFavoriteGenre +
    similarityWithPast +
    similarityWithRecomms;

  return compatabilityScore;
};

module.exports = getCompatScore;
//return score out of 10
