//add rating interaction, update, delete
const { client, rqs } = require('./recombeeConnection');
const checkIfBookExist = require('./bookcheck');
const { addFormattedBook } = require('./items');

// if 'rating' is not provided, function will delete user rating
const bookRating = async (userID, book, rating) => {
  const bookID = book.id.toString();
  try {
    if (rating > 1 || rating < -1)
      throw new Error('Rating value has to be between -1 and 1');
    let idCheck = await checkIfBookExist(bookID);
    if (!idCheck) await addFormattedBook(book);
    if (rating !== undefined) {
      const ratingsList = await client.send(
        new rqs.ListUserRatings(userID + ''),
      );
      const find = ratingsList.some((book) =>
        book.itemId === bookID ? true : false,
      );
      if (find) await deleteRating(userID, bookID + '');
      await addRating(userID, bookID + '', rating);
      return 'Rating added';
    } else {
      await deleteRating(userID, bookID + '');
      return 'Rating deleted';
    }
  } catch (err) {
    return err;
  }
};

const addRating = async (userID, bookID, rating) => {
  try {
    await client.send(
      new rqs.AddRating(userID + '', bookID + '', rating, (err) => {
        if (err) throw Error;
      }),
    );
    return;
  } catch (err) {
    return err;
  }
};

const deleteRating = async (userID, bookID) => {
  try {
    await client.send(
      new rqs.DeleteRating(userID + '', bookID + '', (err) => {
        if (err) throw Error;
      }),
    );
    return;
  } catch (err) {
    return err;
  }
};

module.exports = bookRating;
