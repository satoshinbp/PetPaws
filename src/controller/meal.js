const db = require('../config/connection');

exports.findAll = (req, res) => {
  const pet_id = req.query.pet_id;

  const sqlQuery = 'SELECT id, date, time, type, calorie FROM meals WHERE pet_id = ?';
  db.query(sqlQuery, [pet_id], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};

exports.create = (req, res) => {
  const pet_id = req.body.petID;
  const name = req.body.name;
  const date = req.body.date;
  const type = req.body.type;
  const time = req.body.time;
  const calorie = req.body.calorie;

  const sqlQuery = 'INSERT INTO petpaws.meals (pet_id, name, date, type, time, calorie) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sqlQuery, [pet_id, name, date, type, time, calorie], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};
