const db = require('../config/connection');

// constructor
const User = {};

User.find = (req, res) => {
  const sql = `SELECT * FROM petpaws.users WHERE uid=?`;
  db.query(sql, req, (err, data) => {
    // line about 15 may have issue, leave it, solve later
    // if (err) {
    //   throw err;
    // } else if (data.length === 1) {
    //   res(null, data);
    // } else {
    //   console.log('aaaaa');
    //   res(data);
    // }
    if (data.length === 1) {
      res(null, data);
    }

    //Error happened when signup with below... keep it
    // User.find = (uid, result) => {
    //   const sql = `SELECT * FROM petpaws.users WHERE uid = ?`;

    //   db.query(sql, [uid], (err, data) => {
    //     if (err) {
    //       result(err, null);
    //     } else if (data.length !== 1) {
    //       result(new Error('Could not find a user'), null);
    //     } else {
    //       result(null, data);
  });
};

module.exports = User;
