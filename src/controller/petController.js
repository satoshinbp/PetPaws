exports.petCreate = (req, res) => {
  const user_id = req.body.user_id;
  const name = req.body.name;
  const is_dog = req.body.is_dog;
  const breed = req.body.breed;
  const gender = req.body.gender;
  const is_spayed = req.body.is_spayed;
  const height = req.body.height;
  const weight = req.body.weight;
  const birthday = req.body.birthday;
  const activity_level = req.body.activity_level;
  const body_condition = req.body.body_condition;

  const sql =
    'Insert into pets (user_id, name, is_dog, breed, gender, is_spayed, height, weight, birthday, activity_level, body_condition) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  db.query(
    sql,
    [user_id, name, is_dog, breed, gender, is_spayed, height, weight, birthday, activity_level, body_condition],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      console.log(res);
      result(null, res);
    }
  );
};
