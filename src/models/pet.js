const db = require('../config/connection');

// constructor
const Pet = {};

Pet.findById = (req, result) => {
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

Pet.create = (req, result) => {
  console.log('petModel petData unko', req);
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
