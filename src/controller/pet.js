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

exports.petCreate = (req, res) => {
  console.log('pet cont saisyo', req.body);
  Pet.create(req.body, (err, data) => {
    res.send(data);
  });
};
