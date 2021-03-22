//add view interaction
const { client, rqs } = require('./recombeeConnection');
const checkIfBookExist = require('./bookcheck');
const { addApiBook, addFormattedBook } = require('./items');

const addBookView = async (userID, book, isFormatted) => {
  const bookID = book.id.toString();
  try {
    let idCheck = await checkIfBookExist(bookID);
    if (idCheck) {
      await addDetailView(userID, bookID);
    } else {
      if (isFormatted) await addFormattedBook(book);
      else await addApiBook(book);
      await addDetailView(userID, bookID);
    }
    return 'View added';
  } catch (err) {
    return err;
  }
};

const addDetailView = async (userID, bookID) => {
  try {
    await client.send(
      new rqs.AddDetailView(
        userID + '',
        bookID + '',
        { cascadeCreate: false },
        (err) => {
          if (err) throw Error;
        },
      ),
    );
    return res.length ? true : false;
  } catch (err) {
    return err;
  }
};

module.exports = addBookView;
