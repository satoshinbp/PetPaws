const db = require('../config/connection');

// constructor
const User = {};

User.find = (req, res) => {
  const sql = `SELECT * FROM petpaws.users WHERE uid=?`;
  db.query(sql, req, (err, data) => {
    if (err) {
      throw err;
    } else if (data.length === 1) {
      res(null, data);
    } else {
      res.status(404).send('Could not find a user');
    }
  });
};

module.exports = User;
