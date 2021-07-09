const Pet = require('../models/pet');

exports.findAll = (req, res) => {
  const user_id = req.query.user_id;

  Pet.findByUserId(user_id, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};

exports.petCreate = (req, res) => {
  Pet.create(req.body, (err, data) => {
    res.send(data);
  });
};
