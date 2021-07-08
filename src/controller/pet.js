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

  const sqlQuery = `INSERT INTO petpaws.pets (is_dog, name, breed, birthday, gender, weight, height, is_spayed, activity_level, body_condition, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
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
