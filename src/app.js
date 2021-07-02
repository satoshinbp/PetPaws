const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('../config/connection');
const admin = require('firebase-admin');

// to connect backend and frontend
app.use(cors());

require('./routes/team')(app);

db.connect();

const cert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(cert),
});

app.get('/api/auth', (req, res) => {
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
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.json()); //middleware
app.use(bodyParser.urlencoded({ extended: true }));

// // Display member list
// app.get('/api/get', (req, res) => {
//   const sqlSelect = 'SELECT * FROM petpaws.team_members ';
//   db.query(sqlSelect, (err, result) => {
//     res.send(result);
//   });
// });

// //Insert new members
// app.post('/api/insert', (req, res) => {
//   const name = req.body.name;
//   const role = req.body.role;
//   const image_url = req.body.image_url;
//   const linkedin_url = req.body.linkedin_url;
//   const github_url = req.body.github_url;
//   const behance_url = req.body.behance_url;

//   const sqlInsert =
//     'INSERT INTO team_members (name, role, image_url, linkedin_url, github_url, behance_url) VALUES (?,?,?,?,?,?)';
//   db.query(sqlInsert, [name, role, image_url, linkedin_url, github_url, behance_url], (err, result) => {
//     console.log(err);
//   });
// });

// app.post('/api/user', (req, res) => {
//   const name = req.body.name;
//   const uid = req.body.uid;
//   const email = req.body.email;
//   const sqlInsert = 'INSERT INTO users (name, uid, email) VALUES (?,?,?)';
//   db.query(sqlInsert, [name, uid, email], (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       res.status(200).send(result);
//     }
//   });
// });

// //Delete members
// app.delete('/api/delete/:id', (req, res) => {
//   const id = req.params.id;
//   const sqlDelete = 'DELETE FROM team_members WHERE id = ?';

//   db.query(sqlDelete, id, (err, result) => {
//     if (err) console.log(err);
//   });
// });

// //Update members profile
// app.put('/api/update', (req, res) => {
//   const id = req.body.id;
//   const role = req.body.role;
//   const sqlUpdate = 'UPDATE team_members SET role = ? WHERE id = ?';

//   db.query(sqlUpdate, [role, id], (err, result) => {
//     if (err) console.log(err);
//   });
// });

// finding store function
// Display store list
app.get('/stores/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM petpaws.stores ';
  db.query(sqlSelect, (err, result) => {
    console.log(err);
    console.log(`aa${result}`);
    res.send(result);
  });
});

/* PET */
app.get('/api/pet/get/:uid', (req, res) => {
  const uid = req.params.uid;
  const sqlSelect = 'SELECT * FROM petpaws.pets WHERE uid = ?';

  db.query(sqlSelect, [uid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = app;
