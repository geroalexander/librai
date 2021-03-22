//add view interaction
const { client, rqs } = require('./recombeeConnection');

// console.log('client', client);
// console.log('rqs', rqs);

const addBookView = async (userID, bookID) => {
  console.log('userID-----', userID);
  console.log('bookID-----', bookID);
  try {
    console.log('before adding');
    await client.send(
      new rqs.AddDetailView(
        userID + '',
        bookID,
        { cascadeCreate: false },
        (err) => {
          if (err) throw Error;
        },
      ),
    );
    console.log('after adding');
    return 'View added';
  } catch (err) {
    return err;
  }
};

module.exports = addBookView;
