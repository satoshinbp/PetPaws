// I think I will delete this file

// const db = require('../config/connection');

// // constructor
// const User = function (user) {
//   this.name = user.name;
//   this.uid = user.uid;
//   this.email = user.email;
// };

// User.create = (newUser, result) => {
//   db.query('INSERT INTO users (name, uid, email) VALUES (?,?,?)', newUser, (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('created user: ', { id: res.insertId, ...newUser });
//     result(null, { id: res.insertId, ...newUser });
//   });
// };

// module.exports = User;
