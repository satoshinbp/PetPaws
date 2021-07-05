const db = require('../config/connection');
const User = require('../models/user');

exports.create = (req, res) => {
  const name = req.body.name;
  const uid = req.body.uid;
  const email = req.body.email;
  const sqlInsert = 'INSERT INTO users (name, uid, email) VALUES (?,?,?)';
  db.query(sqlInsert, [name, uid, email], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(result);
    }
  });
};

exports.find = (req, res) => {
  const uid = req.query.uid;
  User.find(uid, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};
