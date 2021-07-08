const admin = require('firebase-admin');

const cert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(cert),
});

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
