//given a book and a user
const { getBookById } = require('../booksApiService/getBookById');
const getRecommendations = require('../recombeeService/getRecommendations');

const getCompatScore = async (user, book) => {
  // check the average rating;
  let hasGoodRating = 0;
  if (book.volumeInfo.averageRating > 4)
    hasGoodRating += book.volumeInfo.averageRating - 4;

  // compare it with favorite genres list
  let isFavoriteGenre = 0;
  const inFavoriteGenres = user.favoriteGenres.some((g) =>
    book.volumeInfo.categories.includes(g),
  );
  if (inFavoriteGenres) isFavoriteGenre++;

  // compare it with past ratings
  let isSimilarToRatings = 0;
  const ratedBooks = user.books.filter((b) => b.interaction.rating === 1);
  const numOfRated = ratedBooks.length;

  ratedBooks.forEach((rated) => {
    console.log('rated---->', rated);

    let similarityScore = 0;
    const sameGenre = rated.categories.some((c) =>
      book.volumeInfo.categories.includes(c),
    );
    if (sameGenre) similarityScore++;
    const sameAuthor = rated.authors.some((a) =>
      book.volumeInfo.authors.includes(a),
    );
    if (sameAuthor) similarityScore++;
    if (
      book.volumeInfo.pageCount >= rated.pageCount - 100 &&
      book.volumeInfo.pageCount <= rated.pageCount + 100
    )
      similarityScore++;
    if (book.volumeInfo.publisher === rated.publisher) similarityScore++;
    if (similarityScore > 2) isSimilarToRatings++;
  });

  console.log('numOfRated---->', numOfRated);
  console.log('isSimilarToRatings---->', isSimilarToRatings);
  let similarityWithPast = 0;
  if (isSimilarToRatings !== 0)
    similarityWithPast = Math.round((isSimilarToRatings / numOfRated) * 4);

  //compare it with recombee suggestions to user
  let similarityWithRecomms = 0;
  const recommBooks = await getRecommendations(user.id, 4);

  for (const rec of recommBooks.recomms) {
    const retrievedBook = await getBookById(rec.id);
    if (retrievedBook) {
      let similarityScore = 0;
      const sameGenre = retrievedBook.volumeInfo.categories.some((c) =>
        book.volumeInfo.categories.includes(c),
      );
      if (sameGenre) similarityScore++;
      const sameAuthor = retrievedBook.volumeInfo.authors.some((a) =>
        book.volumeInfo.authors.includes(a),
      );
      if (sameAuthor) similarityScore++;
      if (
        book.volumeInfo.pageCount >= retrievedBook.volumeInfo.pageCount - 100 &&
        book.volumeInfo.pageCount <= retrievedBook.volumeInfo.pageCount + 100
      )
        similarityScore++;
      if (book.volumeInfo.publisher === retrievedBook.volumeInfo.publisher)
        similarityScore++;
      if (similarityScore > 2) similarityWithRecomms++;
    }
  }

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
