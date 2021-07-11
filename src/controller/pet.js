const db = require('../config/connection');

exports.findAll = (req, res) => {
  const user_id = req.query.user_id;

  const sqlQuery = 'SELECT * FROM petpaws.pets WHERE user_id = ?';
  db.query(sqlQuery, [user_id], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};

exports.create = (req, res) => {
  const is_dog = req.body.isDog;
  const name = req.body.name;
  const breed = req.body.breedName;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const weight = req.body.weight;
  const height = req.body.height;
  const is_spayed = req.body.isSpayed;
  const activity_level = req.body.activityLevel;
  const body_condition = req.body.bodyCondition;
  const user_id = req.body.user_id;

  const sqlQuery =
    'INSERT INTO petpaws.pets (is_dog, name, breed, birthday, gender, weight, height, is_spayed, activity_level, body_condition, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
  db.query(
    sqlQuery,
    [is_dog, name, breed, birthday, gender, weight, height, is_spayed, activity_level, body_condition, user_id],
    (err, data) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(data);
      }
    }
  );
};

exports.update = (req, res) => {
  const id = req.params.id;
  const user_id = req.body.user_id;
  const is_dog = req.body.isDog;
  const name = req.body.name;
  const breed = req.body.breedName;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const weight = req.body.weight;
  const height = req.body.height;
  const is_spayed = req.body.isSpayed;
  const activity_level = req.body.activityLevel;
  const body_condition = req.body.bodyCondition;

  const sqlQuery =
    'UPDATE petpaws.pets SET user_id = ?, is_dog = ?, name = ?, breed = ?, birthday = ?, gender = ?, weight = ?, height = ?, is_spayed = ?, activity_level = ?, body_condition = ? WHERE id = ?';
  db.query(
    sqlQuery,
    [user_id, is_dog, name, breed, birthday, gender, weight, height, is_spayed, activity_level, body_condition, id],
    (err, data) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(data);
      }
    }
  );
};
