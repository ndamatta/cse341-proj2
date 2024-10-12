const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors'); 
const indexRoute = require('./routes');




const port = process.env.PORT || 3001;
const app = express();


app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' })) 
  .use("/", require("./routes/index.js"));

mongodb.connectDatabase((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to database and listening on ${port}`);
  }
});
