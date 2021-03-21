// get recommendations from engine
const { client, rqs } = require('./recombeeConnection')

const getRecommendations = async (userID, count) => {
  try {
    await client.send(new rqs.RecommendItemsToUser(userID + '', count ? count : 5, { cascadeCreate: false }, (err) => {
      if(err) throw Error;
    }));
    return 'Bookmard added'
  } catch (err) {
    return err
  }
};

module.exports = getRecommendations;
