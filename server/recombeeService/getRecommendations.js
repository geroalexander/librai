// get recommendations from engine
const { client, rqs } = require('./recombeeConnection');

// if 'count' is not provided, response will include
// 5 recommendations by default.
const getRecommendations = async (userID, count) => {
  try {
    let result = await client.send(
      new rqs.RecommendItemsToUser(
        userID + '',
        count ? count : 5,
        { cascadeCreate: false, 'logic': 'recombee:personal' },
        (err) => {
          if (err) throw Error;
        },
      ),
    );
    return result; // returns a list of { id: 'bsspAgAAQBAJ' }
  } catch (err) {
    return err;
  }
};

/*
example of response:
{
  recommId: 'db3a1ea8f8d1f1659e5b00cb76be2aad',
  recomms: [
    { id: 'bsspAgAAQBAJ' },
    { id: '9brwAAAAQBAJ' },
    { id: 'Y_uCtAEACAAJ' },
    { id: 'tpDKDwAAQBAJ' },
    { id: 'NMTbDwAAQBAJ' }
  ],
  numberNextRecommsCalls: 0
}
*/
module.exports = getRecommendations;
