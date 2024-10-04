const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const indexRoute = require('./routes')

const port = process.env.PORT || 3001;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', indexRoute);

mongodb.connectDatabase((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to database and listening on ${port}`);
  }
});
