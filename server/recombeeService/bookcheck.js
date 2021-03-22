const checkIfBookExist = async (bookID) => {
  try {
    let res = await client.send(new rqs.ListItems({
      filter: `'itemId' == "${bookID}"`
    }));
    return res.length ? true : false
  } catch (err) {
    return err
  }
};

module.exports = checkIfBookExist;