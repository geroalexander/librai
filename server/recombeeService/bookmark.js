//add bookmark interaction, delete
const { client, rqs } = require('./recombeeConnection')

const bookmark = async (userID, bookID) => {
  try {
    const bookmarkList = await client.send(new rqs.ListUserBookmarks(userID + ''))
    let find = bookmarkList.some(book => book.itemId === bookID ? true : false);
    if (find)  await deleteBookmark(userID, bookID)
    else await addBookmark(userID,bookID)
    return 'Succesfull'
  } catch (err) {
    return err
  }
};

const addBookmark = async (userID, bookID) => {
  try {
    await client.send(new rqs.AddBookmark(userID + '', bookID + ''))
    return 'Bookmard added'
  } catch (err) {
    return err
  }
};
const deleteBookmark = async (userID, bookID) => {
  try {
    await client.send(new rqs.DeleteBookmark(userID + '', bookID + ''))
    return 'Bookmard deleted'
  } catch (err) {
    return err
  }
};

module.exports = bookmark;
