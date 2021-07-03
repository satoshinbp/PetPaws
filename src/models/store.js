const db = require('../config/connection');

// constructor
const Store = {};

Store.getAll = (result) => {
  db.query('SELECT * FROM petpaws.stores', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Store;
