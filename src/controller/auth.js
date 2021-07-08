const admin = require('firebase-admin');

exports.verifyIdToken = (req, res) => {
  admin
    .auth()
    .verifyIdToken(req.headers['authorization'])
    .then((decodedToken) => {
      res.json({ uid: decodedToken.uid });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
};
