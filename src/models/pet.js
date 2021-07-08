const db = require('../config/connection');

// constructor
const Pet = {};

Pet.findByUserId = (user_id, result) => {
  db.query(`SELECT * FROM petpaws.pets WHERE user_id = ${user_id}`, (err, data) => {
    if (err) {
      result(err, null);
    } else {
      result(null, data);
    }
  });
};

Pet.create = (req, result) => {
  const is_dog = req.isDog;
  const name = req.name;
  const breed = req.breedName;
  const birthday = req.birthday;
  const gender = req.gender;
  const weight = req.weight;
  const height = req.height;
  const is_spayed = req.isSpayed;
  const activity_level = req.activityLevel;
  const body_condition = req.bodyCondition;
  const user_id = req.user_id;

  const sql = `INSERT INTO petpaws.pets (is_dog, name, breed, birthday, gender, weight, height, is_spayed, activity_level, body_condition, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;

  db.query(
    sql,
    [is_dog, name, breed, birthday, gender, weight, height, is_spayed, activity_level, body_condition, user_id],
    (err, res) => {
      // if (err) {
      //   console.log('error: ', err);
      //   result(null, err);
      //   return;
      // }
      // console.log('saisyu', res);
      result(res);
    }
  );
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
