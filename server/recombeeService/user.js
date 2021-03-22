//add user details
const { client, rqs } = require('./recombeeConnection')

const addUser = async (user) => {
  try {
    const {userID, email, first_name, last_name } = user
    const values = {email, first_name, last_name}

    await client.send(new rqs.SetUserValues(
      userID + '',
      values,
      {cascade: true},
      (err) => {
        if (err) throw Error;
      }
    ));
    return 'User added'
  } catch (err) {
    return err
  }
};

module.exports = addUser;
