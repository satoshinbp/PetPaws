const Pet = require('../models/pet');

exports.findOne = (req, res) => {
  Pet.findById(req.params.user_id, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
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
