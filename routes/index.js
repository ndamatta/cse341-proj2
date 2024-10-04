const express = require('express');
const router = express.Router();
const gamesIndex = require('./games')

router.get('/', (req, res) => {res.send("Index page working :)")})
router.use('/games', gamesIndex)

module.exports =  router;