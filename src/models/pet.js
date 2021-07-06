const db = require('../config/connection');

// constructor
const Pet = {};

Pet.findByUserId = (user_id, result) => {
  db.query(`SELECT * FROM petpaws.pets WHERE user_id = ${user_id}`, (err, data) => {
    if (err) {
      result(err, null);
    } else if (!data.length) {
      result(new Error('Could not find a pet'), null);
    } else {
      result(null, data);
    }
  });
};

module.exports = Pet;
