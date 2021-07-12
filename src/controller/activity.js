const db = require('../config/connection');

exports.findAll = (req, res) => {
  const pet_id = req.query.pet_id;

  const sqlQuery = 'SELECT id, name, date, minute, distance FROM activities WHERE pet_id = ?';
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
  const minute = req.body.minute;
  const distance = req.body.distance;

  const sqlQuery = 'INSERT INTO petpaws.activities (pet_id, name, date, minute, distance) VALUES (?,?,?,?,?)';
  db.query(sqlQuery, [pet_id, name, date, minute, distance], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};
