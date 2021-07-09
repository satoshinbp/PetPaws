const db = require('../config/connection');

exports.create = (req, res) => {
  const name = req.body.name;
  const uid = req.body.uid;
  const email = req.body.email;

  const sqlQuery = 'INSERT INTO users (name, uid, email) VALUES (?,?,?)';
  db.query(sqlQuery, [name, uid, email], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};

exports.find = (req, res) => {
  const uid = req.params.uid;

  const sqlQuery = `SELECT * FROM petpaws.users WHERE uid = ?`;
  db.query(sqlQuery, [uid], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};
