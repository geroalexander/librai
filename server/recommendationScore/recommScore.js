//given a book and a user
const { getBookById } = require('../booksApiService/getBookById');

const books = require('../models/books');
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
    let similarityScore = 0;
    const sameGenre = rated.categories.some((c) =>
      book.volumeInfo.categories.include(c),
    );
    if (sameGenre) similarityScore++;
    const sameAuthor = rated.author.some((a) =>
      book.volumeInfo.author.include(a),
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

  let similarityWithPast = Math.round((isSimilarToRatings / numOfRated) * 4);

  //compare it with recombee suggestions to user
  let similarityWithRecomms = 0;
  const recommBooks = await getRecommendations(user.id, 4);

  for (const rec of recommBooks.recomms) {
    const retrievedBook = await getBookById(rec.id);
    if (retrievedBook) {
      let similarityScore = 0;
      const sameGenre = rec.categories.some((c) =>
        book.volumeInfo.categories.include(c),
      );
      if (sameGenre) similarityScore++;
      const sameAuthor = rec.author.some((a) =>
        book.volumeInfo.author.include(a),
      );
      if (sameAuthor) similarityScore++;
      if (
        book.volumeInfo.pageCount >= rec.pageCount - 100 &&
        book.volumeInfo.pageCount <= rec.pageCount + 100
      )
        similarityScore++;
      if (book.volumeInfo.publisher === rec.publisher) similarityScore++;
      if (similarityScore > 2) similarityWithRecomms++;
    }
  }

  const compatabilityScore =
    hasGoodRating +
    isFavoriteGenre +
    similarityWithPast +
    similarityWithRecomms;
  return compatabilityScore;
};

module.exports = getCompatScore;
//return score out of 10
