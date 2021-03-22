//add rating interaction, update, delete
const { client, rqs } = require('./recombeeConnection')

// if 'rating' is not provided, function will delete user rating
const bookRating = async (userID, bookID, rating) => {
  try {
    if (rating > 1 || rating < -1) throw Error('Rating value has to be between -1 and 1')

    if (rating !== undefined) {
      const ratingsList = await client.send(new rqs.ListUserRatings(userID + ''))
      const find = ratingsList.some(book => book.itemId === bookID ? true : false);
      console.log(find)
      if (find) await deleteRating(userID, bookID);
      await addRating(userID, bookID, rating);
      return 'Rating added'
    } else {
      await deleteRating(userID, bookID);
      return 'Rating deleted'
    }
  } catch (err) {
    return err
  }
};

const addRating = async (userID, bookID, rating) => {
  try {
    await client.send(new rqs.AddRating(userID + '', bookID, rating, (err) => {
      if (err) throw Error;
    }));
    return
  } catch (err) {
    return err
  }
};

const deleteRating = async (userID, bookID) => {
  try {
    await client.send(new rqs.DeleteRating(userID + '', bookID, (err) => {
      if (err) throw Error;
    }));
    return
  } catch (err) {
    return err
  }
};


module.exports = bookRating;