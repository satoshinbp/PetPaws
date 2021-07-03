const db = require('../config/connection');
const admin = require('firebase-admin');

exports.findAll = (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.headers['authorization'])
    .then((decodedToken) => {
      res.json({ uid: decodedToken.uid });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).send(err);
    });
};
