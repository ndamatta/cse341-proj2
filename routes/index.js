const express = require('express');
const router = express.Router();
const gamesRoute = require('./games')
const swaggerRoute = require('./swagger')

router.get('/', (req, res) => {res.send('Index page working, try with /api-docs')})
router.use('/', swaggerRoute);
router.use('/games', gamesRoute);

module.exports =  router;