const db = require('../config/connection');

// constructor
const Pet = {};

Pet.findById = (user_id, result) => {
  db.query(`SELECT * FROM petpaws.pets WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.length) {
      // console.log('found pet: ', res[0]);
      result(null, res[0]);
      return;
    }
  });
};

module.exports = Pet;
