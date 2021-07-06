const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('./config/connection');
const admin = require('firebase-admin');

// to connect backend and frontend
app.use(cors());

require('./routes/team')(app);
require('./routes/store')(app);
require('./routes/pet')(app);
require('./routes/user')(app);
require('./routes/auth')(app);
require('./routes/meal')(app);
require('./routes/activity')(app);

db.connect();

const cert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(cert),
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

module.exports = app;
