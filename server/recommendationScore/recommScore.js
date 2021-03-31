//given a book and a user
const { getBookById } = require('../booksApiService/getBookById');
const getRecommendations = require('../recombeeService/getRecommendations');

const getCompatScore = async (user, book) => {
  let similarityWithRecomms = 0;
  const recommBooks = await getRecommendations(user.id, 4);
  let bookGenreArr = [];

  if (book.categories && book.categories.length)
    bookGenreArr = book.categories[0].split(' / ');

  for (const rec of recommBooks.recomms) {
    const retrievedBook = await getBookById(rec.id);
    if (!retrievedBook || !retrievedBook.volumeInfo)
      throw new Error('getCompatScore failed', retrievedBook);
    if (retrievedBook.id === book.id) return 10;
    let similarityScore = 0;
    if (
      retrievedBook.volumeInfo.categories &&
      retrievedBook.volumeInfo.categories.length
    ) {
      const formattedGenreArr = retrievedBook.volumeInfo.categories[0].split(
        ' / ',
      );
      const sameGenre = formattedGenreArr.some((c) => bookGenreArr.includes(c));
      if (sameGenre) similarityScore += 2;
    }
    const sameAuthor = retrievedBook.volumeInfo.authors.some((a) =>
      book.authors.includes(a),
    );
    if (sameAuthor) similarityScore++;
    if (
      book.pageCount >= retrievedBook.volumeInfo.pageCount - 200 &&
      book.pageCount <= retrievedBook.volumeInfo.pageCount + 200
    )
      similarityScore++;
    if (book.publisher === retrievedBook.volumeInfo.publisher)
      similarityScore++;
    if (similarityScore > 1 && similarityScore < 3) similarityWithRecomms += 2;
    else if (similarityScore >= 3) similarityWithRecomms += 4;
  }

  // check the average rating;
  let hasGoodRating = 0;
  if (book.averageRating > 3) hasGoodRating += book.averageRating - 3;

  // compare it with favorite genres list
  let isFavoriteGenre = 0;
  const inFavoriteGenres =
    user.favoriteGenres &&
    user.favoriteGenres.some((g) => bookGenreArr.includes(g));
  if (inFavoriteGenres) isFavoriteGenre++;

  // compare it with past ratings
  let isSimilarToRatings = 0;
  const ratedBooks = user.books.filter((b) => b.interaction.rating === 1);
  const numOfRated = ratedBooks.length;

  ratedBooks.forEach((rated) => {
    let similarityScore = 0;
    let formattedRatedGenreArr = [];
    if (rated.categories.length)
      formattedRatedGenreArr = rated.categories[0].split(' / ');
    const sameGenre = formattedRatedGenreArr.some((c) =>
      bookGenreArr.includes(c),
    );
    if (sameGenre) similarityScore++;
    const sameAuthor = rated.authors.some((a) => book.authors.includes(a));
    if (sameAuthor) similarityScore += 2;
    if (
      book.pageCount >= rated.pageCount - 200 &&
      book.pageCount <= rated.pageCount + 200
    )
      similarityScore++;
    if (book.publisher === rated.publisher) similarityScore++;
    if (similarityScore > 1 && similarityScore < 3) isSimilarToRatings += 2;
    else if (similarityScore >= 3) isSimilarToRatings += 4;
  });

  let similarityWithPast = 0;
  if (isSimilarToRatings !== 0)
    similarityWithPast = Math.round((isSimilarToRatings / numOfRated) * 4);

  const compatabilityScore =
    hasGoodRating +
    isFavoriteGenre +
    similarityWithPast +
    similarityWithRecomms;

  if (compatabilityScore === 0) return 2;
  else if (compatabilityScore > 10) return 10;
  return compatabilityScore;
};

module.exports = getCompatScore;
//return score out of 10
