//add bookmark interaction, delete
const { client, rqs } = require('./recombeeConnection');
const checkIfBookExist = require('./bookcheck');
const { addFormattedBook } = require('./items');

const bookmark = async (userID, book) => {
  const bookID = book.id.toString();
  try {
    let idCheck = await checkIfBookExist(bookID);
    if (!idCheck) {
      await addFormattedBook(book);
      await addBookmark(userID, bookID);
      return;
    }
    const bookmarkList = await client.send(
      new rqs.ListUserBookmarks(userID + ''),
    );
    let find = bookmarkList.some((book) =>
      book.itemId === bookID ? true : false,
    );
    if (find) await deleteBookmark(userID, bookID);
    else await addBookmark(userID, bookID);
    return 'Successfull';
  } catch (err) {
    return err;
  }
};

const addBookmark = async (userID, bookID) => {
  try {
    await client.send(
      new rqs.AddBookmark(userID + '', bookID + '', { cascadeCreate: true }),
    );
    return 'Bookmark added';
  } catch (err) {
    return err;
  }
};
const deleteBookmark = async (userID, bookID) => {
  try {
    await client.send(new rqs.DeleteBookmark(userID + '', bookID + ''));
    return 'Bookmark deleted';
  } catch (err) {
    return err;
  }
};

module.exports = bookmark;
