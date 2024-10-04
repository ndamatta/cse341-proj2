const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {res.send("Index page working :)")});

module.exports =  router;