const Pet = require('../models/pet');

exports.findAll = (req, res) => {
  const user_id = req.query.user_id;

  Pet.findByUserId(user_id, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data[0]); // Currently user can register only one pet
    }
  });
};

// exports.find = (req, res) => {
//   const uid = req.query.uid;
//   User.find(uid, (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       res.status(200).send(data);
//     }
//   });
// };

// exports.find = (req, res) => {
//   const uid = req.query.uid;
//   User.find(uid, (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       res.status(200).send(data);
//     }
//   });
// };
