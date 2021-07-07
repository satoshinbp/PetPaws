const db = require('../config/connection');

// constructor
const User = {};

User.find = (uid, result) => {
  const sql = `SELECT * FROM petpaws.users WHERE uid = ?`;

  db.query(sql, [uid], (err, data) => {
    if (err) {
      result(err, null);
    } else if (data.length !== 1) {
      result(new Error('Could not find a user'), null);
    } else {
      result(null, data);
    }
  });
};

module.exports = User;
