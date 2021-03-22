//add view interaction
const { client, rqs } = require('./recombeeConnection');

const addBookView = async (userID, bookID) => {
  try {
    console.log('before');
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
    console.log('after');
    return 'View added';
  } catch (err) {
    return err;
  }
};

module.exports = addBookView;
