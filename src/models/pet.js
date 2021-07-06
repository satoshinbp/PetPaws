const db = require('../config/connection');

// constructor
const Pet = {};

Pet.findById = (req, result) => {
  console.log(req);
  db.query(`SELECT * FROM petpaws.pets WHERE user_id = ${req}`, (err, res) => {
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

// Pet.findById = (req, res) => {
//   const sql = `SELECT * FROM petpaws.pets WHERE user_id = ? `;
//   db.query(sql, req, (err, data) => {
//     if (err) {
//       throw err;
//     } else if (data.length === 1) {
//       res(null, data);
//     } else {
//       res.status(404).send('Could not find a user');
//     }
//   });
// };

// User.find = (req, res) => {
//   const sql = `SELECT * FROM petpaws.users WHERE uid=?`;
//   db.query(sql, req, (err, data) => {
//     if (err) {
//       throw err;
//     } else if (data.length === 1) {
//       res(null, data);
//     } else {
//       res.status(404).send('Could not find a user');
//     }
//   });
// };

// const db = require('../config/connection');

// // constructor
// const Pet = {};

// Pet.findById = (user_id, result) => {
//   db.query(
//     'SELECT pets.id, uid, user_id, pets.name, gender FROM pets INNER JOIN users ON pets.user_id = users.id',
//     (err, res) => {
//       if (err) {
//         console.log('error: ', err);
//         result(null, err);
//         return;
//       }
//       result(null, res);
//     }
//   );
// };

// module.exports = Pet;
